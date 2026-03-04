<template>
  <div>
    <div class="max-w-2xl mx-auto mb-6 flex justify-end items-center gap-3">
      <span class="text-sm text-slate-500 font-medium">{{ $t('summary.selectStyle') }}</span>
      <Popover v-model:open="open">
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="w-[180px] justify-between bg-white border-slate-200"
          >
            {{
              selectedStyle
                ? styleOptions.find((style) => style.value === selectedStyle)?.label
                : 'Select style...'
            }}
            <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-[180px] p-0">
          <Command>
            <CommandInput class="h-9" :placeholder="$t('summary.searchStyle')" />
            <CommandEmpty>{{ $t('summary.noStyle') }}</CommandEmpty>
            <CommandGroup>
              <CommandItem
                v-for="style in styleOptions"
                :key="style.value"
                :value="style.value"
                @select="
                  (ev) => {
                    selectedStyle = ev.detail.value
                    open = false
                  }
                "
              >
                {{ style.label }}
                <Check
                  :class="[
                    'ml-auto h-4 w-4',
                    selectedStyle === style.value ? 'opacity-100' : 'opacity-0',
                  ]"
                />
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>

    <div
      :class="[
        'my-6 max-w-2xl mx-auto relative transition-all duration-300',
        selectedStyle === 'default'
          ? 'drop-shadow-xl rounded-[40px]'
          : 'drop-shadow-2xl rounded-3xl',
      ]"
    >
      <main
        ref="summaryRef"
        :class="[
          'bg-white overflow-hidden',
          selectedStyle === 'default'
            ? 'rounded-[40px] border border-[#17D7A5]'
            : 'rounded-3xl px-10 pt-10 pb-4 pt-12', // Clean minimal container
        ]"
      >
        <div v-if="Object.keys(itemStore.personSummary).length > 0">
          <div v-if="selectedStyle === 'default'">
            <div class="bg-slate-50/50 border-b border-slate-100 mb-6">
              <h1 class="font-bold text-[20px] text-center text-slate-700 pt-6 pb-3">
                {{ $t('summary.splitBillSummary') }}
              </h1>
              <p class="text-center text-slate-500 text-sm mb-6">{{ todayDate }}</p>
            </div>

            <div
              v-for="(data, person) in itemStore.personSummary"
              :key="person"
              class="bg-white p-5 rounded-xl border border-slate-100 shadow-sm mx-6 my-8"
            >
              <div class="flex justify-between items-center mb-3 border-b border-slate-50 pb-2">
                <span class="font-bold text-slate-800 text-lg">{{ person }}</span>
                <span class="font-bold text-green-600 text-lg whitespace-nowrap">
                  IDR {{ Math.round(data.grandTotal).toLocaleString() }}
                </span>
              </div>

              <ul class="flex flex-col gap-1 border-b border-slate-50 pb-2 mb-2">
                <li
                  v-for="(item, idx) in data.items"
                  :key="idx"
                  class="flex justify-between text-sm text-slate-500"
                >
                  <span>{{ item.name }}</span>
                  <span>{{ Math.round(item.cost).toLocaleString() }}</span>
                </li>
              </ul>

              <div class="flex justify-between text-[12px] text-slate-400 font-medium">
                <span>{{ $t('summary.foodSubtotal') }}</span>
                <span>{{ Math.round(data.subtotal).toLocaleString() }}</span>
              </div>
              <div
                v-if="data.totalFees > 0"
                class="flex justify-between text-[12px] text-slate-400 font-medium mt-1"
              >
                <span>{{ $t('summary.serviceChargeAndTax') }}</span>
                <span>+ {{ Math.round(data.totalFees).toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <div v-else-if="selectedStyle === 'minimal'">
            <h1 class="font-extrabold text-3xl text-center text-slate-900 mb-2">
              {{ $t('summary.splitBillSummary') }}
            </h1>
            <p class="text-center text-slate-500 text-lg mb-12">{{ todayDate }}</p>

            <div
              v-for="(data, person) in itemStore.personSummary"
              :key="person"
              class="mb-10 last:mb-0"
            >
              <div class="flex justify-between items-end mb-4">
                <span class="font-extrabold text-slate-700 text-2xl">{{ person }}</span>
                <span class="font-extrabold text-slate-700 text-2xl whitespace-nowrap">
                  {{ Math.round(data.grandTotal).toLocaleString().replace(/,/g, ' ') }}
                </span>
              </div>

              <div class="flex flex-col gap-3 pl-8">
                <div
                  v-for="(item, idx) in data.items"
                  :key="idx"
                  class="flex justify-between text-lg"
                >
                  <span class="font-bold text-slate-500">{{ item.name }}</span>
                  <span class="font-bold text-slate-500 whitespace-nowrap">
                    {{ Math.round(item.cost).toLocaleString().replace(/,/g, ' ') }}
                  </span>
                </div>

                <div
                  v-if="data.totalFees > 0"
                  class="flex justify-between text-base text-slate-400"
                >
                  <span class="font-medium">{{ $t('summary.serviceChargeAndTax') }}</span>
                  <span class="font-medium whitespace-nowrap">
                    {{ Math.round(data.totalFees).toLocaleString().replace(/,/g, ' ') }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col text-center justify-center align-center opacity-50 text-sm pt-12 pb-4"
          >
            <span>{{ $t('summary.subjectedinIDR') }}</span>
            <span class="font-bold">{{ $t('summary.madeWithPatungan') }}</span>
          </div>
        </div>

        <div v-else class="p-4 text-center text-slate-400 italic">
          {{ $t('summary.noClaimedItems') }}
        </div>
      </main>
    </div>

    <div
      v-if="Object.keys(itemStore.personSummary).length > 0"
      class="flex flex-wrap justify-center items-center gap-4 mb-10"
    >
      <Toaster position="top-center" richColors />
      <button
        @click="startOver"
        class="bg-white cursor-pointer hover:bg-slate-50 text-slate-500 border border-slate-200 font-bold py-3 px-6 rounded-full shadow-sm transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {{ $t('summary.startOver') }}
      </button>

      <button
        @click="copySummaryText"
        class="bg-slate-800 cursor-pointer hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        {{ $t('summary.copyText') }}
      </button>

      <button
        @click="downloadSummary"
        class="cursor-pointer bg-[#17D7A5] hover:bg-[#12b88d] text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {{ $t('summary.saveImage') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { toPng } from 'html-to-image'
import { useItemStore } from '@/stores/itemStore'
import { useNameStore } from '@/stores/nameStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

// shadcn-vue imports
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Toaster, toast } from 'vue-sonner'
import 'vue-sonner/style.css'

// Stores
const itemStore = useItemStore()
const nameStore = useNameStore()
const { t } = useI18n()

// ============ Style Selection Logic ============
const open = ref(false)
const selectedStyle = ref('default')

const styleOptions = computed(() => [
  { value: 'default', label: t('summary.styles.defaultGreen') },
  { value: 'minimal', label: t('summary.styles.minimalClean') },
])

const todayDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
})

// ============ Action Functions ============
const summaryRef = ref(null)

// 1. Download as PNG
const downloadSummary = async () => {
  if (!summaryRef.value) return

  try {
    const dataUrl = await toPng(summaryRef.value, {
      quality: 1.0,
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      fontEmbedCSS: '',
    })

    const link = document.createElement('a')
    link.download = `summary-${selectedStyle.value}-${Date.now()}.png`
    link.href = dataUrl
    link.click()
    toast.success('Image has successfully been downloaded!')
  } catch (error) {
    console.error('Error generating image:', error)
    toast.error('Oops! Something went wrong while saving the image.')
  }
}

// 2. Copy to Clipboard as Formatted Text
const copySummaryText = async () => {
  if (Object.keys(itemStore.personSummary).length === 0) return

  // Create a nice, chat-friendly receipt format
  let text = `🧾 *Split Bill Summary*\n📅 ${todayDate.value}\n\n`

  for (const [person, data] of Object.entries(itemStore.personSummary)) {
    text += `🧑 *${person}*\n`
    text += `💰 *Total: IDR ${Math.round(data.grandTotal).toLocaleString()}*\n`

    data.items.forEach((item) => {
      text += `  - ${item.name}: ${Math.round(item.cost).toLocaleString()}\n`
    })

    if (data.totalFees > 0) {
      text += `  - Tax & Service: ${Math.round(data.totalFees).toLocaleString()}\n`
    }
    text += `\n` // Empty line between people
  }

  try {
    await navigator.clipboard.writeText(text.trim())
    toast.success('Text has been copied to clipboard.')
  } catch (error) {
    console.error('Error copying text:', error)
    toast.error('Failed to copy text. Your browser might not support this feature.')
  }
}

// 3. Start Over
const startOver = () => {
  if (confirm('Are you sure you want to start over? This will clear all items and people.')) {
    // If you configured Pinia stores with standard $reset methods:
    if (typeof itemStore.$reset === 'function') itemStore.$reset()
    if (typeof nameStore.$reset === 'function') nameStore.$reset()
    window.location.reload()
    // Fallback if $reset isn't configured in your store logic:
    // window.location.reload()
  }
}
</script>
