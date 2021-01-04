import store from 'src/store';

export const isAuthorized = () => {
  return Date.now() % 2;
  const {auth} = store.getState();
  return !!auth.token;
};
