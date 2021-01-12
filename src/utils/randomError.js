import throwError from 'src/utils/throwError';

export default (cof = 0.5) => {
  const value = Math.random();
  const success = 1 - cof;
  if (value <= success) {
    return true;
  }
  throwError('lorem ipsum', 400, {why: 'Because life is so cruel'});
};
