import request from 'src/utils/request';

export const auth = async (credentials) => request.post('auth', credentials);

export const logout = async () => request.post('auth/logout');

export const removeAccount = async (reason) => request.delete('auth', {reason});
