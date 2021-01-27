import {Platform} from 'react-native';
import pSBC from 'shade-blend-color';

export const isIOS = Platform.OS === 'ios';

export const isAndroid = Platform.OS === 'android';

export const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export const saturate = (color, saturation) => pSBC(saturation, color);

export const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);

export const getRandom = (arr) => {
  const index = getRandomIndex(arr);
  return arr[index];
};
