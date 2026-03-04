import { createI18n } from 'vue-i18n'
import idLocale from './locales/id.json'
import enLocale from './locales/en.json'

const i18n = createI18n({
  legacy: false, // Use composition API mode
  locale: 'id', // Default language is Indonesian
  fallbackLocale: 'id',
  messages: {
    id: idLocale,
    en: enLocale,
  },
})

export default i18n
