import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import pt from "./locales/pt-BR.json";
import en from "./locales/en-US.json";
import es from "./locales/es-ES.json";

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        pt: {
            transition: pt,
        },
        en: {
            transition: en,
        },
        es: {
            transition: es,
        },
    },

    fallbacking: "pt",
    interpolation: {
        escapeValue: false
    },
});

export default i18n;