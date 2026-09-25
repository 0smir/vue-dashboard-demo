import { createI18n } from "vue-i18n";
import en from "./locales/en";
import ua from "./locales/ua";
import ru from "./locales/ru";
const savedLanguage = localStorage.getItem("lang") || "en";

export default createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: "en",
  messages: {
    en,
    ua,
    ru,
  },
});
