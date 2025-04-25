// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import HttpBackend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

// i18n
//   .use(HttpBackend)
//   // .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     fallbackLng: "nl",
//     debug: true,
//     ns: ["auth", "dashboard"],
//     defaultNS: "auth",
//     backend: {
//       loadPath: "/locales/{{lng}}/{{ns}}.json", // <<-- dynamic path
//     },
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;

// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import auth from "../../locales/en/auth.json";
import dashboard from "../../locales/en/dashboard.json";
import nlAuth from "../../locales/nl/auth.json";
import nlDashboard from "../../locales/nl/dashboard.json";

export const defaultNS = "auth";

export const resources = {
  en: {
    auth,
    dashboard,
  },
  nl: {
    auth: nlAuth,
    dashboard: nlDashboard,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "nl",
  ns: ["auth", "dashboard"],
  defaultNS,
  resources,
  debug: true,
  fallbackLng: "nl",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
