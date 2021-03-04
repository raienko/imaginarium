import types from './types';

export const initialState = {
  game: null,
  cards: [],
  searching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.fetchGame:
      return {
        ...state,
        game: action.payload.game,
      };
    case types.updateGame:
      return {
        ...state,
        game: action.payload.game,
      };
    case types.leaveGame:
      return {
        ...state,
        game: null,
      };
    case types.searchGame:
      return {
        ...state,
        searching: true,
      };
    case types.cancelSearch:
      return {
        ...state,
        searching: false,
      };
    case types.fetchCards:
      return {
        ...state,
        cards: action.payload.cards,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
