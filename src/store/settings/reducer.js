import types from './types';

export const initialState = {
  language: 'en',
  music: true,
  vibration: true,
  notifications: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.changeLanguage:
      return {
        ...state,
        language: action.payload.language,
      };
    case types.toggleMusic:
      return {
        ...state,
        music: action.payload.value,
      };
    case types.toggleVibration:
      return {
        ...state,
        vibration: action.payload.value,
      };
    case types.toggleNotifications:
      return {
        ...state,
        notifications: action.payload.value,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
