import store from 'src/store';
import types from './types';

export const auth = (credentials) => {
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
      },
    },
  });
};

export const logout = () => {
  return store.dispatch({type: types.logout});
};
