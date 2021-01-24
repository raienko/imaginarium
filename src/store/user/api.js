import request from 'src/utils/request';

export const fetchUser = () => {
  return request.get('user');
};

export const updateUser = (changes) => {
  return request.post('user', changes);
};

export const fetchProfiles = (ids) => {
  return request.get('user/profiles', {ids});
};

export const checkUsername = (username) => {
  return request.post('user/username', {username});
};
