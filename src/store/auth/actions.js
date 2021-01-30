import store from 'src/store';
import types from './types';
import * as api from './api';

export const auth = async (username, password) => {
  const {accessToken, refreshToken, userId} = await api.auth({
    username,
    password,
  });
  return store.dispatch({
    type: types.auth,
    payload: {
      accessToken,
      refreshToken,
      userId,
    },
  });
};

export const logout = async () => {
  await api.logout();
  return store.dispatch({type: types.logout});
};

export const removeAccount = async (reason) => {
  await api.removeAccount(reason);
  return store.dispatch({type: types.removeAccount});
};
