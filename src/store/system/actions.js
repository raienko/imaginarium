import store from 'src/store';
import logger from 'src/utils/logger';
import signalQuality from 'src/constants/signalQuality';
import ws from 'src/utils/websocket';
import types from './types';
import * as api from './api';

export const pingServer = async () => {
  const timestamp = Date.now();
  const response = await api
    .pingServer()
    .catch((err) => logger.error('Failed to ping server: ', err.message));
  const now = Date.now();

  const delay = now - timestamp;
  let signal = signalQuality.good;
  if (delay >= 300) {
    signal = signalQuality.normal;
  }
  if (delay >= 600) {
    signal = signalQuality.bad;
  }

  const connected = response?.message === 'pong';

  await store.dispatch({
    type: types.ping,
    payload: {
      connected,
      online: response !== 404,
      signal,
    },
  });

  return connected;
};

export const startSockets = async () => {
  await ws.connect();
};

export const stopSockets = async () => {
  await ws.disconnect();
};

export const setReadyState = async (ready) => {
  return store.dispatch({
    type: types.setReadyState,
    payload: {ready},
  });
};

export const setSocketStatus = async (status) => {
  return store.dispatch({
    type: types.setSocketStatus,
    payload: {
      status,
    },
  });
};
