import request from 'src/utils/request';

export const pingServer = async () => {
  return request('ping', {method: 'GET'});
};
