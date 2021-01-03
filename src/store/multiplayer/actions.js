import store from 'src/store';
import types from './types';

export const searchGame = (params) => {
  return store.dispatch({
    type: types.searchGame,
    payload: params,
  });
};

export const cancelSearch = () => {
  return store.dispatch({
    type: types.cancelSearch,
  });
};

export const createGame = (config) => {
  const game = {
    id: 'asdasd',
  };

  return store.dispatch({
    type: types.createGame,
    payload: {
      game: {
        ...config,
      },
    },
  });
};

export const fetchGame = () => {
  return store.dispatch({
    type: types.fetchGame,
    payload: {game},
  });
};

export const updateGame = (changes) => {
  return store.dispatch({
    type: types.updateGame,
    payload: {
      changes,
    },
  });
};

export const leaveGame = () => {
  return store.dispatch({type: types.leaveGame});
};
