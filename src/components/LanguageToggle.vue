<template>
  <div
    class="flex items-center gap-3 bg-white rounded-full px-5 py-2 border border-[#17D7A5] shadow-sm"
  >
    <button
      @click="toggleLanguage"
      class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors text-sm font-medium cursor-pointer"
      :class="[
        currentLocale === 'id'
          ? 'bg-[#17D7A5] text-white'
          : 'text-slate-600 hover:bg-slate-100 transition-colors',
      ]"
    >
      🇮🇩 ID
    </button>
    <button
      @click="toggleLanguage"
      class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors text-sm font-medium cursor-pointer"
      :class="[
        currentLocale === 'en'
          ? 'bg-[#17D7A5] text-white'
          : 'text-slate-600 hover:bg-slate-100 transition-colors',
      ]"
    >
      🇬🇧 EN
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const toggleLanguage = () => {
  locale.value = locale.value === 'id' ? 'en' : 'id'
  // Save language preference to localStorage
  localStorage.setItem('language', locale.value)
}
</script>

<style scoped></style>
