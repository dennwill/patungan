const express = require('express')
const multer = require('multer')
const cors = require('cors')
const { GoogleGenAI } = require('@google/genai')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  },
})

const fileToGenerativePart = (buffer, mimeType) => {
  return {
    inlineData: {
      data: buffer.toString('base64'),
      mimeType: mimeType,
    },
  }
}

// Scan receipt endpoint
app.post('/api/scan-receipt', upload.single('receipt'), async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    })
    const model = 'gemini-3.1-flash-lite-preview'

    const imagePart = fileToGenerativePart(req.file.buffer, req.file.mimetype)

    const prompt = `
      You are an expert receipt parser. Analyze the attached receipt image and extract the ordered items, as well as any service charge and tax (PPN/PBJT) information.
      Return ONLY a raw, valid JSON object. Do not use markdown blocks like \`\`\`json.
      
      The JSON object MUST have the following exact structure:
      {
        "items": [
          { "name": "string", "price": number, "qty": number }
        ],
        "serviceCharge": {
          "present": boolean,
          "type": "string", 
          "amount": number 
        },
        "tax": {
          "present": boolean,
          "type": "string", 
          "amount": number 
        }
      }

      Rules for items:
      1. If quantity is not explicitly stated, assume 1.
      2. Prices must be standard numbers (e.g., 25000) without currency symbols or commas.
      3. DO NOT include subtotal, total, tax, pbjt, service charge, change, or payment methods in the "items" array. Only the actual food/drink items.

      Rules for serviceCharge and tax:
      1. For "type", use ONLY "%" (if a percentage is explicitly written) or "nominal" (if it is a flat amount).
      2. STRICT RULE: DO NOT calculate percentages yourself. Unless a percentage symbol (%) or percentage word is explicitly printed on the receipt next to the charge, you MUST default the "type" to "nominal" and extract the flat monetary amount.
      3. If a service charge is detected, set "present" to true. If it explicitly shows a percentage, set "type" to "%" and extract that number (e.g., 5). Otherwise, set "type" to "nominal" and extract the flat fee (e.g., 15000).
      4. If a tax (PPN, PB1, PBJT, or Tax) is detected, set "present" to true and follow the exact same explicit percentage vs. nominal rule as above.
      5. If either is NOT found on the receipt, set its "present" to false, "type" to "nominal", and "amount" to 0.
    `

    const generationRequest = {
      model: model,
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }, imagePart],
        },
      ],
    }

    const streamingResp = await ai.models.generateContentStream(generationRequest)
    let text = ''
    for await (const chunk of streamingResp) {
      if (chunk.text) {
        text += chunk.text
      }
    }

    // Parse the JSON response
    let parsedData
    try {
      parsedData = JSON.parse(text)
    } catch (parseError) {
      console.error('Failed to parse AI response:', text)
      return res.status(500).json({ error: 'Failed to parse receipt data' })
    }

    res.json(parsedData)
  } catch (error) {
    console.error('Error processing receipt:', error)
    res.status(500).json({ error: 'Failed to process receipt' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`)
})
