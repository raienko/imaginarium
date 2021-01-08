import env from 'src/constants/env';

export default class Websocket {
  _ws;
  _url;
  _callback;

  constructor(url = env.HOST, callback = () => {}) {
    this._url = url;
    this._callback = callback;
  }

  connect = () => {
    if (this._ws) {
      throw new Error('Already connected');
    }

    const token = 'some_token';

    const url = this._url;
    const protocols = 'echo-protocol';
    const options = {
      headers: {Authorization: token},
    };

    this._ws = new WebSocket(url, protocols, options);
    this._ws.onmessage = this._handleMessage;
  };

  send = (type, data) => {
    const message = JSON.stringify({type, data});
    this._ws.send(message);
  };

  disconnect = () => {
    this._ws.close();
    this._ws = null;
  };

  _handleMessage = (message) => {
    console.log('Received message:', {message});
    this._callback(message);
  };
}
