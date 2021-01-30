import types from './types';

export const initialState = {
  accessToken: null,
  refreshToken: null,
  userId: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.auth:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
      };
    case types.logout:
    case types.removeAccount:
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
