import types from './types';

export const initialState = {
  profile: {
    username: '',
    character: 0,
  },
  friends: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.fetchUser:
    case types.updateUser:
      return {
        ...state,
        profile: action.payload.profile,
      };
    case types.fetchFriends:
      return {
        friends: action.payload.friends,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
