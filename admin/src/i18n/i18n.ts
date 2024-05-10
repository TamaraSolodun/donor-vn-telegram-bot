import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import textDataEN from '../i18n/en.locale.json' assert { type: 'json' };

import { textData } from './TextData';
const resources = {
  en: {
    translation: {
      ...textDataEN,
    },
  },
  ua: {
    translation: {
      ...textData.ua,
    },
  },
};

// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
  resources,
  lng: 'ua',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
export { default } from 'i18next';
