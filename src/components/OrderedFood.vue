<template>
  <main class="bg-white rounded-[40px] border-1 border-[#17D7A5] drop-shadow-xl max-w-2xl mx-auto">
    <div>
      <div class="bg-slate-50/50 border-b border-slate-100 mb-6">
        <h1 class="font-bold text-[20px] text-center text-slate-700 py-6">{{ $t('orderedFood.title') }}</h1>
      </div>
      <div class="max-w-xl mx-auto font-sans p-6">
        <!--Scan Receipt-->
        <div class="mb-8">
          <label
            for="receipt-upload"
            class="flex flex-col items-center justify-center w-full py-16 px-4 border-[4px] border-dashed border-[#7ee2c5] rounded-[2rem] opacity-50 cursor-not-allowed transition-colors duration-200"
          >
            <div class="flex flex-col items-center justify-center text-center">
              <span class="text-4xl mb-3">📸</span>

              <h3 class="text-[22px] font-bold text-gray-700 mb-1">{{ $t('orderedFood.scanReceipt') }}</h3>

              <p class="text-gray-400 text-sm font-medium">{{ $t('orderedFood.disabled') }}</p>
            </div>
          </label>
        </div>
      </div>
      <div v-for="(item, index) in itemsList" :key="index" class="flex flex-row gap-2 mx-8 my-6">
        <input
          type="text"
          v-model="item.name"
          class="flex h-10 w-1/3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
          :placeholder="$t('orderedFood.itemName')"
        />
        <input
          type="number"
          v-model.number="item.price"
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
      <div class="max-w-full px-4 my-6 mx-4">
        <Button
          @click="itemStore.addNewRow"
          class="w-full cursor-pointer"
          size="lg"
          variant="outline"
          >{{ $t('orderedFood.addItemManually') }}</Button
        >
      </div>
      <!-- <div>
        {{ itemsList }}
      </div> -->
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Button from './ui/button/Button.vue'
import { useItemStore } from '@/stores/itemStore'
import { storeToRefs } from 'pinia'

const itemStore = useItemStore()
const { itemsList } = storeToRefs(itemStore)
</script>

<style lang="scss" scoped></style>
