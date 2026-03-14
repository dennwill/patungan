const express = require('express')
const multer = require('multer')
const cors = require('cors')
const { GoogleGenerativeAI } = require('@google/generative-ai')
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

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

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

      Rules:
      - Extract all food/drink items with their names, prices, and quantities
      - Look for service charge (biaya layanan, service charge) and tax (PPN, PBJT, tax)
      - If service charge or tax is a percentage, calculate the amount if possible, otherwise set amount to 0
      - Ensure prices are numbers (remove currency symbols)
      - If quantity is not specified, assume 1
      - Be precise and accurate
    `

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

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
