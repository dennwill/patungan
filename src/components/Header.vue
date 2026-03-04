<template>
  <main class="flex flex-col justify-center items-center text-center text-white bg-[#064E3B] py-10">
    <div class="flex justify-center items-center text-center gap-3">
      <img src="/patungan-logo.png" width="48px" />
      <h1 class="text-[24px] font-bold">{{ $t('header.title') }}</h1>
    </div>
    <div class="mt-4">
      <span v-html="$t('header.tagline')"></span>
    </div>
    <div class="mt-6">
      <LanguageToggle />
    </div>
  </main>
</template>

<script setup>
import LanguageToggle from './LanguageToggle.vue'
</script>

<style lang="scss" scoped></style>
