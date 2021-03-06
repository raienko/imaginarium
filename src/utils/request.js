/* global AbortController */
import env from 'src/config/env';
import {getToken} from 'src/utils/store';
import logger from 'src/utils/logger';
import userAgent from 'src/utils/userAgent';
import throwError from 'src/utils/throwError';

let requestID = 0;

const request = async (url, params, timeout = 3000) => {
  const rID = requestID++;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const options = {
    signal: controller.signal,
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

      if (!response.ok) {
        throwError(result.error || response.statusText, response.status);
      }

      logger.in(`[${rID}] ${env.HOST}/${url}`, result);
      return result;
    })
    .catch((err) => {
      logger.failed(`[${rID}] ${env.HOST}/${url}`, err.message, err.code);
      return throwError(err.message, err.code || 500);
    })
    .finally(() => clearTimeout(timer));
};

request.post = (url, body, params) =>
  request(url, {
    ...params,
    method: 'POST',
    body,
  });

request.put = (url, body, params) =>
  request(url, {
    ...params,
    method: 'PUT',
    body,
  });

request.get = (url, params) =>
  request(url, {
    ...params,
    method: 'GET',
  });

request.delete = (url, params) =>
  request(url, {
    ...params,
    method: 'DELETE',
  });

export default request;
