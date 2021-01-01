import store from 'src/store';
import localization from 'localization';
import types from './types';

export const changeLanguage = (language) => {
  localization.changeLanguage(language);
  return store.dispatch({
    type: types.changeLanguage,
    payload: {language},
  });
};

export const toggleMusic = (value) => {
  return store.dispatch({type: types.toggleMusic, payload: {value}});
};

export const toggleVibration = (value) => {
  return store.dispatch({type: types.toggleVibration, payload: {value}});
};

export const toggleNotifications = (value) => {
  return store.dispatch({type: types.toggleNotifications, payload: {value}});
};
