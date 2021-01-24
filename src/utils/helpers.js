import {Platform} from 'react-native';
import store from 'src/store';
import pSBC from 'shade-blend-color';

export const isAuthorized = () => {
  const token = getToken();
  return !!token;
};

export const getToken = () => {
  const {auth} = store.getState();
  return auth.token;
};

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const saturate = (color, saturation) => pSBC(saturation, color);
