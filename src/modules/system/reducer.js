import signalQuality from 'src/config/signalQuality';
import types from './types';

export const initialState = {
  connected: true,
  online: true,
  signal: signalQuality.good,
  sockets: true,
  ready: false,
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
    case types.setReadyState:
      return {
        ...state,
        ready: action.payload.ready,
      };
    default: {
      return {
        ...state,
      };
    }
  }
};
