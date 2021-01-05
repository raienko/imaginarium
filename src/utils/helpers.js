import store from 'src/store';

export const isAuthorized = () => {
  const {auth} = store.getState();
  return !!auth.authorized;
};
