import * as React from 'react';

export const navigationRef = React.createRef();

export default {
  navigate: (name, params) => navigationRef.current?.navigate(name, params),
  back: () => navigationRef.current?.goBack(),
  getParam: (key) => {
    const params = navigationRef.current?.getCurrentRoute()?.params;
    return params?.[key];
  },
};
