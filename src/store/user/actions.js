import store from 'src/store';
import * as api from './api';
import types from './types';

export const fetchUser = async () => {
  const profile = await api.fetchUser();
  return store.dispatch({
    type: types.fetchUser,
    payload: {
      profile,
    },
  });
};

export const updateUser = async (changes) => {
  const profile = await api.updateUser(changes);
  return store.dispatch({
    type: types.updateUser,
    payload: {
      profile,
    },
  });
};

export const fetchFriends = async (filters) => {
  const friends = await api.fetchFriends(filters);
  return store.dispatch({
    type: types.fetchFriends,
    payload: {
      friends,
    },
  });
};
