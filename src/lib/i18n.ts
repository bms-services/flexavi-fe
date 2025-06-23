import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

const lng = import.meta.env.VITE_LOCAL as string;

i18n
  .use(initReactI18next)
  .use(HttpBackend)
  .init({
    lng,
    fallbackLng: lng,
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;