import env from 'src/constants/env';
import EventBus from 'src/utils/EventBus';
import throwError from 'src/utils/throwError';

export const events = {
  connected: 'connected',
  disconnected: 'disconnected',
  message: 'message',
  error: 'error',
};

export default new (class Websocket extends EventBus {
  _ws;

  _shouldRestart;

  _handleSocketOpened = () => this.dispatch(events.connected);

  _handleSocketClosed = () => {
    this._ws = null;
    this.dispatch(events.disconnected);
  };

  _handleSocketError = (err) => this.dispatch(events.error, err);

  _handleSocketMessage = (message) => {
    console.log({message});
    const data = JSON.parse(message);
    console.log({data});
    this.dispatch(events.message, data);
  };

  connect = (token) => {
    if (this._ws) {
      throwError('Already connected!');
    }

    this._shouldRestart = true;
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
    this._ws.close();
    this._shouldRestart = false;
  };
})();
