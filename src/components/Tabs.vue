<template>
  <main class="min-h-screen">
    <div class="flex flex-wrap justify-center gap-1 py-6">
      <button
        v-for="(tabName, tabKey) in tabLabels"
        :key="tabKey"
        @click="activeTab = tabKey"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
          activeTab === tabKey
            ? 'bg-[#00c49a] text-white border-[#00c49a]' // Active state
            : 'bg-white text-gray-700 border-[#00c49a] hover:bg-teal-50 cursor-pointer', // Inactive state
        ]"
      >
        {{ tabName }}
      </button>
    </div>
    <div>
      <div v-if="activeTab === 'orderedFood'">
        <OrderedFood /><AdditionalFees />
        <div class="flex justify-center w-full pr-6 pb-4">
          <Button class="bg-[#00BFA5] cursor-pointer" size="lg" @click="activeTab = 'participants'"
            >{{ $t('tabs.participants') }} →</Button
          >
        </div>
      </div>
      <div v-else-if="activeTab === 'participants'">
        <Participants />
        <div class="flex justify-center w-full pr-6 pb-4">
          <Button class="bg-[#00BFA5] cursor-pointer" size="lg" @click="activeTab = 'claiming'"
            >{{ $t('tabs.claiming') }} →</Button
          >
        </div>
      </div>
      <div v-else-if="activeTab === 'claiming'">
        <Claiming />
        <div class="flex justify-center w-full pr-6 pb-4">
          <Button class="bg-[#00BFA5] cursor-pointer" size="lg" @click="activeTab = 'summary'"
            >{{ $t('tabs.summary') }} →</Button
          >
        </div>
      </div>
      <div v-else-if="activeTab === 'summary'">
        <Summary />
        <div class="flex justify-center w-full pr-6 pb-4"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import OrderedFood from './OrderedFood.vue'
import AdditionalItems from './AdditionalFees.vue'
import AdditionalFees from './AdditionalFees.vue'
import Button from './ui/button/Button.vue'
import Participants from './Participants.vue'
import Claiming from './Claiming.vue'
import Summary from './Summary.vue'

const { t } = useI18n()

const activeTab = ref('orderedFood')

const tabLabels = computed(() => ({
  orderedFood: t('tabs.orderedFood'),
  participants: t('tabs.participants'),
  claiming: t('tabs.claiming'),
  summary: t('tabs.summary'),
}))

const refreshPage = () => {
  window.location.reload()
}
</script>

<style lang="scss" scoped></style>
