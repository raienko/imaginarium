import env from 'src/config/env';
import EventBus from 'src/utils/EventBus';
import throwError from 'src/utils/throwError';
import logger from 'src/utils/logger';

let count = 0;

export const events = {
  connected: 'connected',
  disconnected: 'disconnected',
  message: 'message',
  error: 'error',
};

export default new (class Websocket extends EventBus {
  _ws;

  _token;

  _handleSocketOpened = () => {
    logger.success('Sockets connection opened');
    this.dispatch(events.connected);
    this._clearTimers();
  };

  _handleSocketClosed = () => {
    this._ws = null;
    if (this._token) {
      this._restart();
    } else {
      this.dispatch(events.disconnected);
      logger.warn('Sockets connection closed');
    }
  };

  _handleSocketError = (err) => this.dispatch(events.error, err);

  _handleSocketMessage = (message) => {
    console.log({message});
    const data = JSON.parse(message.data);
    console.log({data});
    this.dispatch(events.message, data);
  };

  _restart = () => {
    logger.info('Socket reconnecting');
    const timeout = count++ * 1000;
    this._timer = setTimeout(() => this.connect(this._token), timeout);
  };

  _clearTimers = () => {
    count = 0;
    clearTimeout(this._timer);
  };

  connect = (token) => {
    if (this._ws) {
      throwError('Already connected!');
    }

    this._token = token;
    const url = env.HOST;
    const protocols = 'echo-protocol';
    const options = {
      headers: {Authorization: token},
    };

    this._ws = new WebSocket(url, protocols, options);
    this._ws.onopen = this._handleSocketOpened;
    this._ws.onclose = this._handleSocketClosed;
    this._ws.onerror = this._handleSocketError;
    this._ws.onmessage = this._handleSocketMessage;
  };

  send = (type, data) => {
    const message = JSON.stringify({type, data});
    this._ws.send(message);
  };

  disconnect = () => {
    this._token = '';
    this._ws?.close();
    this._clearTimers();
  };
})();
