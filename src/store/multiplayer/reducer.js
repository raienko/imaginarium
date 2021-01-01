import types from './types';

export const initialState = {
  soloGame: null,
  multiplayerGame: null,
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.createGame:
      return {
        ...initialState,
        ...action.payload.config,
      };
    case types.dealCards:
      return {
        ...state,
        cards: action.payload.card,
        deck: action.payload.deck,
      };
    case types.playCard:
      return {
        ...state,
        set: action.payload.set,
        cards: action.payload.card,
      };
    case types.playWord:
      return {
        ...state,
        association: action.payload.association,
      };
    case types.selectCard:
      return {
        ...state,
        choices: action.payload.choices,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
