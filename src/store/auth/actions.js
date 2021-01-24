import store from 'src/store';
import types from './types';
import * as api from './api';

export const register = async (user) => {
  const {token, refreshToken, userId} = await api.register(user);
  return store.dispatch({
    type: types.register,
    payload: {token, refreshToken, userId},
  });
};

export const login = async (credentials) => {
  const {token, refreshToken, userId} = await api.login(credentials);
  return store.dispatch({
    type: types.login,
    payload: {token, refreshToken, userId},
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
