import {getToken, isAuthorized} from 'src/utils/store';
import * as systemActions from 'src/modules/system/actions';
import * as userActions from 'src/modules/user/actions';

export const handleAppLaunched = async () => {
  const authorized = isAuthorized();
  const token = getToken();

  if (authorized) {
    await userActions.fetchUser();
    await systemActions.startSockets(token);
  }
};
