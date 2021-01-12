import request from 'src/utils/request';

export const createGame = async (params) => {
  return request('games', {
    method: 'POST',
    body: params,
  });
};

export const updateGame = async (gameId, params) => {
  return request(`games/${gameId}`, {
    method: 'PUT',
    body: params,
  });
};

export const searchGame = async (params) => {
  return request('queue', {method: 'POST'});
};
