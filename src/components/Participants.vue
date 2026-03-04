<template>
  <main
    class="bg-white rounded-[40px] border-1 border-[#17D7A5] drop-shadow-xl my-6 max-w-2xl mx-auto overflow-hidden"
  >
    <div class="bg-slate-50/50 border-b border-slate-100 mb-6">
      <h1 class="font-bold text-[20px] text-center text-slate-700 py-6">
        {{ $t('participants.title') }}
      </h1>
    </div>

    <div class="flex flex-row gap-6 px-8 pb-2">
      <input
        type="text"
        v-model="inputName"
        class="flex h-10 w-4/5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder:text-slate-400"
        :placeholder="$t('participants.placeholder')"
        @keyup.enter="handleAdd"
      />
      <Button class="bg-green-600 cursor-pointer" @click="handleAdd">{{
        $t('participants.add')
      }}</Button>
    </div>

    <div class="flex gap-2 px-6 py-6">
      <Badge
        v-if="names"
        v-for="(name, idx) in names"
        :key="idx"
        class="bg-[#95FFA5] text-opacity-70 border-2 border-black border-opacity-20 font-semibold pl-4 hover:bg-green-400 text-[14px]"
        >{{ name
        }}<Button variant="primary" class="cursor-pointer" :key="idx" @click="handleDelete(idx)"
          >X</Button
        ></Badge
      >
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { Button, buttonVariants } from '@/components/ui/button'
import Badge from './ui/badge/Badge.vue'
import { useNameStore } from '@/stores/nameStore'
import { storeToRefs } from 'pinia'

const nameStore = useNameStore()
const { names } = storeToRefs(nameStore)
const inputName = ref('')

const handleAdd = () => {
  nameStore.addName(inputName.value)
  inputName.value = ''
}

const handleDelete = (idx) => {
  nameStore.deleteName(idx)
}
</script>

<style lang="scss" scoped></style>
