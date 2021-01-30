import store from 'src/store';

export const isAuthorized = () => {
  const token = getToken();
  return !!token;
};

export const getToken = () => {
  const {auth} = store.getState();
  return auth.accessToken?.token;
};
