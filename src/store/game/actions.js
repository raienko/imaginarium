import store from 'src/store';
import types from './types';

export const createGame = (type, config) => {
  return store.dispatch({
    type: types.createGame,
    payload: {
      type,
      game: {
        ...game,
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
