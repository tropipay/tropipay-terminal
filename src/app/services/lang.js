import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // reactI18nextModule
import LanguageDetector from "i18next-browser-languagedetector";

import translationES from "../languages/es.json";
import translationEN from "../languages/es.json";

class Lang {
  constructor(i18n) {
    this.i18n = i18n;
    this.default = "en";
    this.configure();
  }

  configure() {
    this.i18n
      .use(LanguageDetector)
      //.use(reactI18nextModule)
      .use(initReactI18next)
      .init({
        lng: this.getLan(),
        interpolation: {
          escapeValue: false,
        },
        resources: this.getResources(),
      });
  }

  getSupported() {
    return [
      {
        lang: "es",
        translation: translationES,
        active: true,
        label: "Español",
      },
      {
        lang: "en",
        translation: translationEN,
        active: true,
        label: "English",
      },
    ];
  }

  getResources() {
    const locales = this.getSupported();
    const resources = {};
    locales.map((item) =>
      item.active
        ? (resources[item.lang] = { translation: item.translation })
        : null
    );
    return resources;
  }

  getLan() {
    return this.getLanFromBrowser();
  }

  getLanFromBrowser() {
    const navigatorLang = window.navigator.language;
    const locales = this.getSupported();
    const supported = locales.find(
      (item) => item.active && navigatorLang.includes(item.lang)
    );
    return supported ? supported.lang : this.default;
  }

  setLan(lanId) {
    lanId = lanId || this.default;
    this.i18n.changeLanguage(lanId);
  }
}

const instance = new Lang(i18n);
instance.Lang = Lang;
export default instance;
