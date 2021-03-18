import {AppState} from 'react-native';
import {getToken, isAuthorized} from 'src/utils/store';
import NetInfo from '@react-native-community/netinfo';
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

  return () => {
    systemActions.stopSockets();
    AppState.removeListener('appStateDidChange', handleAppStateChange);
    unsubscribeNetwork();
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
