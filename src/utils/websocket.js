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

  constructor(props) {
    super(props);
  }

  connect = (token) => {
    if (this._ws) {
      throwError('Already connected!');
    }

    const url = env.HOST;
    const protocols = 'echo-protocol';
    const options = {
      headers: {Authorization: token},
    };

    this._ws = new WebSocket(url, protocols, options);
    this._ws.onopen = () => this.dispatch(events.connected);
    this._ws.onclose = () => {
      this._ws = null;
      this.dispatch(events.disconnected);
    };
    this._ws.onerror = (err) => this.dispatch(events.error, err);
    this._ws.onmessage = (message) => this.dispatch(events.message, message);
  };

  send = (type, data) => {
    const message = JSON.stringify({type, data});
    this._ws.send(message);
  };

  disconnect = () => {
    this._ws.close();
  };
})();
