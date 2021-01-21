import signalQuality from 'src/constants/signalQuality';
import types from './types';

export const initialState = {
  connected: true,
  online: true,
  signal: signalQuality.good,
  sockets: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ping:
      return {
        ...state,
        connected: action.payload.connected,
        online: action.payload.online,
        signal: action.payload.signal,
      };
    case types.setSocketStatus:
      return {
        ...state,
        sockets: action.payload.status,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
