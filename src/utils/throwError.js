import logger from 'src/utils/logger';

export default function throwError(message, code, data) {
  const err = new Error(message);
  err.code = code;
  err.data = data;
  logger.warn('Error!', {message, code, data});
  throw err;
}
