import store from 'src/store';
import types from './types';
import * as api from './api';
import throwError from 'src/utils/throwError';

export const createGame = async (params) => {
  const game = await api.createGame(params);
  return store.dispatch({
    type: types.fetchGame,
    payload: {
      game,
    },
  });
};

export const fetchGame = async () => {
  const game = await api.fetchGame();
  return store.dispatch({
    type: types.fetchGame,
    payload: {
      game,
    },
  });
};

export const searchGame = async (params) => {
  try {
    await api.searchGame(params);
    return store.dispatch({type: types.searchGame});
  } catch (err) {
    throwError('Game search failed', err.code);
  }
};

export const cancelSearch = async () => {
  await api.cancelSearch();
  return store.dispatch({type: types.cancelSearch});
};

export const fetchCards = () => {
  const cards = [];
  return store.dispatch({
    type: types.fetchCards,
    payload: {cards},
  });
};

export const updateGame = (changes) => {
  const game = {id: Date.now(), ...changes};
  return store.dispatch({
    type: types.fetchGame,
    payload: {game},
  });
};

export const leaveGame = async () => {
  await api.leaveGame();
  return store.dispatch({type: types.leaveGame});
};
