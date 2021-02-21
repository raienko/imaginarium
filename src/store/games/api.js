import request from 'src/utils/request';

export const createGame = async (config) => {
  return request.post('game', config);
};

export const fetchGame = async () => {
  return request.get('game');
};

export const updateGame = async (params) => {
  return request.put('game');
};

export const searchGame = async (params) => {
  return request.post('matchmaking', params);
};

export const cancelSearch = async () => {
  return request.delete('matchmaking');
};
