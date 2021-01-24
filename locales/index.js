import i18n from 'i18next';
import {initReactI18next, withTranslation} from 'react-i18next';

import en from './en.json';
import ru from './ru.json';

const config = {
  lng: 'ru',
  fallbackLng: 'en',
  debug: global.__DEV__,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  },
};

i18n
  .use(initReactI18next)
  .init(config);

export default i18n;

export const updateOnLanguageChange = (Component) => withTranslation()(Component);
