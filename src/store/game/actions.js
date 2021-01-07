import store from 'src/store';
import types from './types';

export const createGame = (config) => {
  const game = {id: Date.now()};
  return store.dispatch({
    type: types.fetchGame,
    payload: {
      game,
    },
  });
};

export const fetchGame = () => {
  const game = {id: Date.now()};
  return store.dispatch({
    type: types.fetchGame,
    payload: {game},
  });
};

export const searchGame = () => {
  return store.dispatch({type: types.searchGame});
};

export const cancelGameSearch = () => {
  return store.dispatch({type: types.cancelGameSearch});
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

export const fetchPlayers = (ids) => {
  const players = ids.map((id) => ({id, name: Date.now(), score: 0}));
  return store.dispatch({
    type: types.fetchPlayers,
    payload: {players},
  });
};

export const leaveGame = () => {
  return store.dispatch({type: types.clearGameData});
};
