import env from 'src/constants/env';
import {getToken} from 'src/utils/helpers';
import logger from 'src/utils/logger';
import userAgent from 'src/utils/userAgent';
import throwError from 'src/utils/throwError';

let requestID = 0;

export default async (url, params) => {
  const rID = requestID++;

  const options = {
    ...params,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
      ...params?.headers,
    },
  };

  const token = getToken();
  if (token) {
    options.headers.Authorization = token;
  }

  if (typeof params?.body === 'object') {
    options.body = JSON.stringify(params.body);
  }

  logger.out(`[${rID}] ${env.HOST}/${url}`, options);

  return fetch(`${env.HOST}/${url}`, options)
    .then(async (response) => {
      let result;
      try {
        result = await response.json();
      } catch (e) {
        result = response;
      }
      logger.in(`[${rID}] ${env.HOST}/${url}`, result);
      return result;
    })
    .catch((err) => {
      logger.failed(`[${rID}] ${env.HOST}/${url}`, err.message, err.code);
      throwError(err.message);
    });
};
