import types from './types';

export const initialState = {
  searching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default: {
      return {
        ...state,
      };
    }
  }
};
