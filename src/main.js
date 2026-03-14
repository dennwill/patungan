import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import './styles.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { MdFastfoodRound, FaUserAlt, FaInbox, CoPlus } from 'oh-vue-icons/icons'

addIcons(MdFastfoodRound, FaUserAlt, FaInbox, CoPlus)

const app = createApp(App)

// Load saved language preference from localStorage
const savedLanguage = localStorage.getItem('language') || 'id'
i18n.global.locale.value = savedLanguage

app.use(createPinia())
app.use(i18n)
app.component('v-icon', OhVueIcon)

app.mount('#app')
