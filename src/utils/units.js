import {Dimensions} from 'react-native';

export const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const vw = (size = 0) => Math.floor((screenWidth / 100) * size);

export const vh = (size = 0) => Math.floor((screenHeight / 100) * size);

export const rem = (size = 0) => {
  const portraitOrientation = screenHeight > screenWidth;
  const base = portraitOrientation ? screenWidth : screenHeight;
  return Math.floor((base / 380) * size);
};
