import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18next.use(LanguageDetector).use(initReactI18next).use(Backend).init({
  returnObjects: true,
  lng: "en", // Default language as english
  fallbackLng: "en", // Language to fallback to if the selected is not configured
  debug: true, // To enable us see errors

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // react i18next special options (optional)
  // override if needed - omit if ok with defaults
  /*
  react: {
    bindI18n: 'languageChanged',
    bindI18nStore: '',
    transEmptyNodeValue: '',
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    useSuspense: true,
  }
  */

  resources: {
    en: {
      translation: {
        "welcome": "Welcome to our store",
        "language": "Language"
        // other translations
      }
    },
  }
});

export default i18next;