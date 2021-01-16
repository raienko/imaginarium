import store from 'src/store';
import types from './types';
import * as api from './api';

export const auth = async (credentials) => {
  const token = 'fake_token';
  return store.dispatch({
    type: types.authorize,
    payload: {token},
  });
};

export const fetchProfile = async () => {
  const profile = {
    username: 'John',
    role: 'player',
    head: 0,
    body: 0,
  };
  return store.dispatch({
    type: types.fetchProfile,
    payload: {profile},
  });
};

export const updateProfile = async (changes) => {
  const profile = {
    ...store.getState().auth.profile,
    ...changes,
  };

  return store.dispatch({
    type: types.fetchProfile,
    payload: {profile},
  });
};

export const removeAccount = async (reason) => {
  // do server request;
  await logout();
};

export const logout = async () => {
  await api.signOut().catch(() => {});
  return store.dispatch({type: types.logout});
};
