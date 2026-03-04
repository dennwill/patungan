import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import './styles.css'

const app = createApp(App)

// Load saved language preference from localStorage
const savedLanguage = localStorage.getItem('language') || 'id'
i18n.global.locale.value = savedLanguage

app.use(createPinia())
app.use(i18n)

app.mount('#app')
