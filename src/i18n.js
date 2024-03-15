// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';




// the translations
const resources = {
 
 
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    keySeparator: false, // key separator (false means use object structure)
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
