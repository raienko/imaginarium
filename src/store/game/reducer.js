import types from './types';

export const initialState = {
  game: null,
  progress: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.createGame:
      return {
        ...state,
        game: action.payload.game,
      };
    case types.fetchGame:
      return {
        ...state,
        game: action.payload.game,
      };
    case types.updateGame:
      return {
        ...state,
        game: {
          ...state.game,
          ...action.payload.changes,
        },
      };
    case types.leaveGame:
      return {
        ...initialState,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
