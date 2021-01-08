import {Platform} from 'react-native';
import store from 'src/store';

export const isAuthorized = () => {
  const {auth} = store.getState();
  return !!auth.authorized;
};

export const getToken = () => {
  const {auth} = store.getState();
  return auth.token;
};

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';
