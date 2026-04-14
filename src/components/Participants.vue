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
      <Button class="bg-[#00BFA5] cursor-pointer" @click="handleAdd">{{
        $t('participants.add')
      }}</Button>
    </div>

    <div
      v-if="names.length > 0"
      class="flex flex-wrap gap-3 px-8 py-4 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200"
    >
      <Badge
        v-for="(name, idx) in names"
        :key="idx"
        class="flex items-center gap-1 bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] font-medium py-1.5 pl-4 pr-1 rounded-full hover:bg-[#bbf7d0] transition-all duration-200 shadow-sm"
      >
        <span class="text-sm tracking-wide">{{ name }}</span>
        <button
          @click="handleDelete(idx)"
          class="cursor-pointer ml-1 p-1 hover:bg-[#166534]/10 rounded-full transition-colors group"
          aria-label="Remove participant"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5 text-[#166534]/60 group-hover:text-[#166534]"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </Badge>
    </div>

    <div v-else class="pb-10 text-center text-slate-400 italic text-[14px]">
      <div class="p-6 flex flex-col items-center justify-center gap-3">
        <v-icon name="co-user-x" scale="4" />
        {{ $t('participants.noParticipants', 'No participants added yet') }}
      </div>
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
