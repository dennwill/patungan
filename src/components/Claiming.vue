<template>
  <main
    v-if="
      itemsList.length === 0 ||
      itemsList.every((item) => !item.name && !item.price && item.sharedBy.length === 0)
    "
    class="bg-white rounded-[40px] border-1 border-[#17D7A5] drop-shadow-xl my-6 max-w-2xl mx-auto overflow-hidden"
  >
    <div class="p-10 text-center text-slate-400 italic">
      {{ $t('claiming.noItems') }}
    </div>
  </main>
  <main
    v-else
    class="bg-white rounded-[40px] border-1 border-[#17D7A5] drop-shadow-xl my-6 max-w-2xl mx-auto overflow-hidden"
  >
    <div class="bg-slate-50/50 border-b border-slate-100 mb-6 pb-4 text-center">
      <h1 class="font-bold text-[20px] text-slate-700 py-6">{{ $t('claiming.title') }}</h1>
      <span class="text-[12px] text-slate-700 py-6">{{ $t('claiming.selectWho') }}</span
      ><br />
      <span class="text-[12px] text-slate-700 py-6 italic">{{ $t('claiming.tip') }}</span>
    </div>

    <div
      v-for="(item, index) in itemsList"
      :key="index"
      class="border py-2 px-4 my-4 mx-4 rounded-lg"
    >
      <h2 class="my-4">
        <b>{{ item.name }} (x{{ item.qty }})</b>
        <span class="font-light text-[12px] mx-2">Rp. {{ item.price }}</span>
      </h2>
      <div>
        <label class="cursor-pointer">
          <input type="checkbox" class="peer hidden" />
          <div class="flex gap-2 flex-wrap">
            <label v-for="name in names" :key="name" class="cursor-pointer">
              <input type="checkbox" :value="name" v-model="item.sharedBy" class="peer hidden" />
              <div
                class="rounded-xl border-2 border-slate-200 bg-white px-4 py-1 font-medium text-slate-600 transition-all peer-checked:border-yellow-500 peer-checked:bg-yellow-400 peer-checked:text-black"
              >
                {{ name }}
              </div>
            </label>
          </div>
        </label>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useItemStore } from '@/stores/itemStore'
import { useNameStore } from '@/stores/nameStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const inputName = ref('')
const store = useItemStore()
const { itemsList } = storeToRefs(store)

const nameStore = useNameStore()
const { names } = storeToRefs(nameStore)
const selectedParticipants = ref([]) // Array will fill with names as they are checked
</script>

<style lang="scss" scoped></style>
