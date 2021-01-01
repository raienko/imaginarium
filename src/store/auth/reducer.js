import types from './types';

export const initialState = {
  token: '',
  profile: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.authorize:
      return {
        ...state,
        token: action.payload.token,
      };
    case types.fetchProfile:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case types.logout:
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
