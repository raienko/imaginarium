import {AppState} from 'react-native';
import {getToken, isAuthorized} from 'src/utils/store';
import NetInfo from '@react-native-community/netinfo';
import ws, {events} from 'src/utils/websocket';
import * as systemActions from 'src/modules/system/actions';
import * as userActions from 'src/modules/user/actions';

export const handleAppLaunched = async () => {
  const authorized = isAuthorized();
  const token = getToken();

  const unsubscribeNetwork = NetInfo.addEventListener(systemActions.pingServer);
  // TODO refresh token if expired

  if (authorized) {
    await userActions.fetchUser();
    await systemActions.startSockets(token);
  }

  AppState.addListener('appStateDidChange', handleAppStateChange);
  const stopSocketsListener = startSocketsListener();

  return () => {
    systemActions.stopSockets();
    AppState.removeListener('appStateDidChange', handleAppStateChange);
    unsubscribeNetwork();
    stopSocketsListener();
  };
};

export const handleAppStateChange = async () => {
  const active = AppState.currentState === 'active';
  const token = getToken();

  if (active && token) {
    await systemActions.startSockets(token);
  } else {
    await systemActions.stopSockets();
  }
};

export const startSocketsListener = () => {
  return ws.subscribe(events.message, (message) => {
    console.log('Socket message received: ', message);
    switch (message?.type) {
      case 'game_created':
        return handleGameStarted();
    }
  });
};

export const handleGameStarted = async () => {
  await userActions.fetchUser();
};
