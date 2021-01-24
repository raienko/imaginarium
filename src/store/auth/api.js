import request from 'src/utils/request';

export const register = async (user) => request.post('auth/register', {user});

export const login = async (credentials) =>
  request.post('auth/login', {credentials});

export const logout = async () => request.post('auth/logout');

export const removeAccount = async (reason) => request.delete('auth', {reason});
