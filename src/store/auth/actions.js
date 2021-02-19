import store from 'src/store';
import * as systemActions from 'src/store/system/actions';
import types from './types';
import * as api from './api';

export const auth = async (username, password) => {
  const {accessToken, refreshToken, userId} = await api.auth({
    username,
    password,
  });
  await systemActions.startSockets(accessToken.token);
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
  await Promise.allSettled([api.logout, systemActions.stopSockets]);
  return store.dispatch({type: types.logout});
};

export const removeAccount = async (reason) => {
  await api.removeAccount(reason);
  await systemActions.stopSockets();
  return store.dispatch({type: types.removeAccount});
};
