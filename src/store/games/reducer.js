import types from './types';

export const initialState = {
  current: null,
  cards: [],
  searching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.fetchGame:
      return {
        ...state,
        current: action.payload.game,
      };
    case types.updateGame:
      return {
        ...state,
        current: action.payload.game,
      };
    case types.leaveGame:
      return {
        ...state,
        current: null,
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
