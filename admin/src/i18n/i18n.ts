import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import textDataEN from '../i18n/en.locale.json' assert { type: 'json' };
import textDataUA from '../i18n/ua.locate.json' assert { type: 'json' };

const resources = {
  EN: {
    translation: {
      ...textDataEN,
    },
  },
  UA: {
    translation: {
      ...textDataUA,
    },
  },
};

// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
  resources,
  lng: 'UA',
  fallbackLng: 'EN',
  interpolation: {
    escapeValue: false,
  },
});
export { default } from 'i18next';
