import Game from 'src/models/Game';

export const createGame = async (params) => {
  return new Game(params);
};

export const searchGame = async (params) => {
  return true;
};

export const joinGame = async (params) => {

};
