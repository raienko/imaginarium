import types from './types';

export const initialState = {
  profile: {
    id: '',
    username: '',
    character: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.fetchUser:
    case types.updateUser:
      return {
        ...state,
        profile: action.payload.profile,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
