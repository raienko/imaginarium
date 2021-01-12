import types from './types';

export const initialState = {
  currentGame: null,
  players: [],
  cards: [],
  searching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.fetchGame:
      return {
        ...state,
        searching: false,
        currentGame: action.payload.game,
      };
    case types.searchGame:
      return {
        ...state,
        searching: true,
      };
    case types.cancelGameSearch:
      return {
        ...state,
        searching: false,
      };
    case types.fetchCards:
      return {
        ...state,
        cards: action.payload.cards,
      };
    case types.fetchPlayers:
      return {
        ...state,
        players: action.payload.players,
      };
    case types.clearGameData:
      return {
        ...initialState,
        cards: state.cards,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
