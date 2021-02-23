import NetInfo from '@react-native-community/netinfo';
import * as systemActions from 'src/store/system/actions';
import EventBus from './EventBus';

export const events = {
  online: 'online',
  offline: 'offline',
};

export default class Network extends EventBus {
  _online = false;

  start = () => {
    return NetInfo.addEventListener(this.check);
  };

  check = async () => {
    await systemActions.pingServer();
  };

  stop = () => {};
}
