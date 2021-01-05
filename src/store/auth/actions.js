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

export const fetchProfile = () => {
  return store.dispatch({
    type: types.fetchProfile,
    payload: {
      profile: {
        name: 'John',
        birthday: '2020.01.92',
        role: 'player',
      },
    },
  });
};

export const logout = async () => {
  await api.signOut().catch(() => {});
  return store.dispatch({type: types.logout});
};
