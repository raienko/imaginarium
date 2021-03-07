import * as authActions from 'src/modules/auth/actions';
import * as systemActions from 'src/modules/system/actions';
import * as userActions from 'src/modules/user/actions';

export const login = async (username, password) => {
  const credentials = await authActions.auth(username, password);
  await systemActions.startSockets(credentials.accessToken);
  await userActions.fetchUser();
};

export const logout = async () => {
  await authActions.logout();
  await systemActions.stopSockets();
  await userActions.reset();
};

export const removeAccount = async (reason) => {
  await authActions.removeAccount(reason);
  await systemActions.stopSockets();
  await userActions.reset();
};
