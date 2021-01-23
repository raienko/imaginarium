import DeviceInfo from 'react-native-device-info';

export default JSON.stringify({
  id: DeviceInfo.getUniqueId(),
  device: DeviceInfo.getDeviceId(),
  version: DeviceInfo.getReadableVersion(),
});
