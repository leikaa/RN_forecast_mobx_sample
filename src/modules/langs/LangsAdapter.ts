import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './localization/en/en';
import { ru } from './localization/ru/ru';

i18n.use(initReactI18next).init({
  resources: {
    en,
    ru,
  },
  lng: 'en',
  defaultNS: 'common',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export const Localization = i18n;
