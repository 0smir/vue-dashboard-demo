import { createI18n } from "vue-i18n";
import en from "./locales/en";
import ua from "./locales/ua";
import ru from "./locales/ru";

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ua,
    ru,
  },
});
