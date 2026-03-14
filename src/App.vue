<script setup>
import Header from './components/Header.vue'
import Tabs from './components/Tabs.vue'
</script>

<template>
  <main class="bg-[#F0FDF4]">
    <Header />
    <Tabs class="px-4" />
    <div
      class="flex flex-col gap-1 justify-center items-center text-sm text-center text-gray-400 py-6"
    >
      <div class="flex flex-row">
        {{ $t('github') }}
        <a href="https://github.com/dennwill" target="_blank" rel="noopener noreferrer">
          <img
            src="/github-black.png"
            alt="Visit Dennwill's GitHub profile"
            width="24"
            height="24"
            style="margin-left: 10px"
          />
        </a>
      </div>
      <div class="flex flex-row">
        {{ $t('donation') }}
        <a
          href="https://saweria.co/dennwill"
          target="_blank"
          rel="noopener noreferrer"
          class="font-bold ml-1 hover:underline"
        >
          {{ $t('support') }}
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Plus Jakarta Sans */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
</style>
