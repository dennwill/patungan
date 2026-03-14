<template>
  <main class="bg-white rounded-[40px] border-1 border-[#17D7A5] drop-shadow-xl max-w-2xl mx-auto">
    <div>
      <div class="bg-slate-50/50 border-b border-slate-100 mb-6">
        <h1 class="font-bold text-[20px] text-center text-slate-700 py-6">
          {{ $t('orderedFood.title') }}
        </h1>
      </div>
      <div class="max-w-xl mx-auto font-sans p-6">
        <div class="mb-8">
          <input
            type="file"
            id="receipt-upload"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
            :disabled="isScanning"
          />
          <label
            for="receipt-upload"
            class="flex flex-col items-center justify-center w-full py-16 px-4 border-[4px] border-dashed border-[#17D7A5] rounded-[2rem] cursor-pointer hover:bg-[#F0FDF4] transition-colors duration-200"
            :class="{ 'opacity-50 cursor-not-allowed': isScanning }"
          >
            <div class="flex flex-col items-center justify-center text-center">
              <span class="text-4xl mb-3" v-if="!isScanning">✨</span>

              <svg
                v-else
                class="animate-spin -ml-1 mr-3 h-10 w-10 text-[#17D7A5] mb-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

              <h3 class="text-[22px] font-bold text-gray-700 mb-1">
                {{ isScanning ? $t('orderedFood.scanningAI') : $t('orderedFood.scanWithAI') }}
              </h3>

              <p class="text-gray-400 text-sm font-medium">
                {{
                  isScanning ? $t('orderedFood.scanningWait') : $t('orderedFood.uploadInstruction')
                }}
              </p>
            </div>
          </label>
        </div>
      </div>

      <div v-for="(item, index) in itemsList" :key="index" class="flex flex-row gap-2 mx-8 my-6">
        <input
          type="text"
          v-model="item.name"
          @blur="cleanEmptyRow(index)"
          class="flex h-10 w-1/3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          :placeholder="$t('orderedFood.itemName')"
        />
        <input
          type="number"
          v-model.number="item.price"
          @blur="cleanEmptyRow(index)"
          class="flex h-10 w-1/4 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          :placeholder="$t('orderedFood.price')"
        />
        <input
          type="number"
          v-model.number="item.qty"
          class="flex h-10 w-1/4 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          :placeholder="$t('orderedFood.quantity')"
          max="1000"
        />
        <Button @click="itemStore.removeRow(index)" class="bg-red-600 font-bold cursor-pointer"
          >X</Button
        >
      </div>

      <div class="max-w-full px-4 my-6 mx-4 pb-4">
        <Button
          @click="handleAddManually"
          class="w-full cursor-pointer"
          size="lg"
          variant="outline"
          >{{ $t('orderedFood.addItemManually') }}</Button
        >
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Button from './ui/button/Button.vue'
import { useItemStore } from '@/stores/itemStore'
import { storeToRefs } from 'pinia'
import { toast } from 'vue-sonner'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const itemStore = useItemStore()
const { itemsList } = storeToRefs(itemStore)

const isScanning = ref(false)

const handleAddManually = () => {
  if (itemsList.value.length > 0) {
    const lastItem = itemsList.value[itemsList.value.length - 1]

    if (!lastItem.name || lastItem.name.trim() === '') {
      toast.warning(
        t('orderedFood.toast.fillPreviousFirst') ||
          'Please fill in the blank item before adding a new one.',
      )
      return
    }
  }

  itemStore.addNewRow()
}

const cleanEmptyRow = (index) => {
  setTimeout(() => {
    const item = itemsList.value[index]
    if (!item) return
    if ((!item.name || item.name.trim() === '') && !item.price) {
      itemStore.removeRow(index)
    }
  }, 100)
}

const fileToGenerativePart = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1]
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      })
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    toast.error(t('orderedFood.toast.missingKey'))
    event.target.value = ''
    return
  }

  isScanning.value = true
  toast.info(t('orderedFood.toast.processing'))

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

    const imagePart = await fileToGenerativePart(file)

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

    const result = await model.generateContent([prompt, imagePart])
    const responseText = result.response.text().trim()

    const jsonString = responseText.replace(/^```json\n?|```$/g, '').trim()

    const extractedData = JSON.parse(jsonString)

    if (
      extractedData.items &&
      Array.isArray(extractedData.items) &&
      extractedData.items.length > 0
    ) {
      if (itemsList.value.length === 1 && !itemsList.value[0].name && !itemsList.value[0].price) {
        itemStore.removeRow(0)
      }

      extractedData.items.forEach((item) => {
        itemsList.value.push({
          name: item.name || 'Unknown Item',
          price: item.price || 0,
          qty: item.qty || 1,
          sharedBy: [],
        })
      })

      if (extractedData.serviceCharge?.present) {
        itemStore.fees.isSC = true
        itemStore.fees.typeSC = extractedData.serviceCharge.type === 'nominal' ? 'nominal' : '%'
        itemStore.fees.amountSC = extractedData.serviceCharge.amount
      } else {
        itemStore.fees.isSC = false
      }

      if (extractedData.tax?.present) {
        itemStore.fees.isPBJT = true
        itemStore.fees.typePBJT = extractedData.tax.type === 'nominal' ? 'nominal' : '%'
        itemStore.fees.amountPBJT = extractedData.tax.amount
      } else {
        itemStore.fees.isPBJT = false
      }

      let toastMsg = t('orderedFood.toast.successItems', { count: extractedData.items.length })
      if (extractedData.serviceCharge?.present || extractedData.tax?.present) {
        toastMsg += t('orderedFood.toast.successFees')
      }

      toast.success(toastMsg)
    } else {
      toast.warning(t('orderedFood.toast.noItems'))
    }
  } catch (error) {
    console.error('AI Extraction Error:', error)
    toast.error(t('orderedFood.toast.error'))
  } finally {
    isScanning.value = false
    event.target.value = '' // Reset input
  }
}
</script>
