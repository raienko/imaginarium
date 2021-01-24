import types from './types';

export const initialState = {
  token: '',
  refreshToken: '',
  userId: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.register:
    case types.login:
      return {
        ...state,
        token: action.payload.token,
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
