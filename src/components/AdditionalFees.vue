<template>
  <main
    class="bg-white rounded-[40px] border-1 border-[#17D7A5] drop-shadow-xl my-6 max-w-2xl mx-auto overflow-hidden"
  >
    <div class="bg-slate-50/50 border-b border-slate-100 mb-6">
      <h1 class="font-bold text-[20px] text-center text-slate-700 py-6">
        {{ $t('additionalFees.title') }}
      </h1>
    </div>

    <div class="flex flex-col gap-6 px-8 pb-10">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-3 w-[150px]">
          <input
            type="checkbox"
            id="service-charge"
            v-model="store.fees.isSC"
            class="w-4 h-4 cursor-pointer accent-[#17D7A5]"
          />
          <label
            for="service-charge"
            class="text-sm font-medium leading-none cursor-pointer select-none"
          >
            {{ $t('additionalFees.serviceCharge') }}
          </label>
        </div>

        <Popover v-model:open="openSC" v-if="store.fees.isSC">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="openSC"
              class="w-[200px] justify-between transition-all"
            >
              {{
                store.fees.typeSC
                  ? choices.find((choice) => choice.value === store.fees.typeSC)?.label
                  : 'Select choice...'
              }}
              <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No choice found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="choice in choices"
                    :key="choice.value"
                    :value="choice.value"
                    @select="
                      () => {
                        store.fees.typeSC = store.fees.typeSC === choice.value ? '' : choice.value
                        openSC = false
                      }
                    "
                  >
                    <CheckIcon
                      :class="
                        cn(
                          'mr-2 h-4 w-4',
                          store.fees.typeSC === choice.value ? 'opacity-100' : 'opacity-0',
                        )
                      "
                    />
                    {{ choice.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <input
          type="number"
          v-if="store.fees.isSC"
          v-model.number="store.fees.amountSC"
          class="flex h-10 w-[120px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          placeholder="Amount"
        />
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-3 w-[150px]">
          <input
            type="checkbox"
            id="PBJT"
            v-model="store.fees.isPBJT"
            class="w-4 h-4 cursor-pointer accent-[#17D7A5]"
          />
          <label for="PBJT" class="text-sm font-medium leading-none cursor-pointer select-none">
            {{ $t('additionalFees.pbjt') }}
          </label>
        </div>

        <Popover v-model:open="openPBJT" v-if="store.fees.isPBJT">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="openPBJT"
              class="w-[200px] justify-between transition-all"
            >
              {{
                store.fees.typePBJT
                  ? choices.find((choice) => choice.value === store.fees.typePBJT)?.label
                  : 'Select choice...'
              }}
              <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No choice found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="choice in choices"
                    :key="choice.value"
                    :value="choice.value"
                    @select="
                      () => {
                        store.fees.typePBJT =
                          store.fees.typePBJT === choice.value ? '' : choice.value
                        openPBJT = false
                      }
                    "
                  >
                    <CheckIcon
                      :class="
                        cn(
                          'mr-2 h-4 w-4',
                          store.fees.typePBJT === choice.value ? 'opacity-100' : 'opacity-0',
                        )
                      "
                    />
                    {{ choice.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <input
          type="number"
          v-if="store.fees.isPBJT"
          v-model.number="store.fees.amountPBJT"
          class="flex h-10 w-[120px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          placeholder="Amount"
        />
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <div class="flex items-center gap-3 w-[150px]">
          <input
            type="checkbox"
            id="global-discount"
            v-model="store.fees.isGlobalDiscount"
            class="w-4 h-4 cursor-pointer accent-[#17D7A5]"
          />
          <label
            for="global-discount"
            class="text-sm font-medium leading-none cursor-pointer select-none"
          >
            {{ $t('additionalFees.globalDiscount', 'Global Discount') }}
          </label>
        </div>

        <Popover v-model:open="openGD" v-if="store.fees.isGlobalDiscount">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="openGD"
              class="w-[200px] justify-between transition-all"
            >
              {{
                store.fees.typeGlobalDiscount
                  ? choices.find((choice) => choice.value === store.fees.typeGlobalDiscount)?.label
                  : 'Select choice...'
              }}
              <ChevronsUpDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>No choice found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    v-for="choice in choices"
                    :key="choice.value"
                    :value="choice.value"
                    @select="
                      () => {
                        store.fees.typeGlobalDiscount =
                          store.fees.typeGlobalDiscount === choice.value ? '' : choice.value
                        openGD = false
                      }
                    "
                  >
                    <CheckIcon
                      :class="
                        cn(
                          'mr-2 h-4 w-4',
                          store.fees.typeGlobalDiscount === choice.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )
                      "
                    />
                    {{ choice.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <input
          type="number"
          v-if="store.fees.isGlobalDiscount"
          v-model.number="store.fees.amountGlobalDiscount"
          class="flex h-10 w-[120px] rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          placeholder="Amount"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

// Import the store
import { useItemStore } from '@/stores/itemStore'

const store = useItemStore()

const choices = [
  { value: '%', label: '%' },
  { value: 'nominal', label: 'Nominal' },
]

// Keep popover toggles local (they are just UI states)
const openSC = ref(false)
const openPBJT = ref(false)
const openGD = ref(false)
</script>

<style lang="scss" scoped></style>
