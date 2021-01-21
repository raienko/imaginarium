import throwError from 'src/utils/throwError';
import logger from 'src/utils/logger';

export default class EventBus {
  constructor() {
    this._listeners = {};
  }

  subscribe = (event, callback) => {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    const alreadySubscribed = this._listeners[event].includes(callback);
    if (alreadySubscribed) {
      throwError(`You already subscribed for the ${event}`);
    }

    this._listeners[event].push(callback);

    return () => this.unsubscribe(event, callback);
  };

  unsubscribe = (event, callback) => {
    if (this._listeners[event]) {
      this._listeners[event] = this._listeners[event].filter(
        (i) => i !== callback,
      );
    }
  };

  dispatch = (event, data) => {
    if (!this._listeners[event]) {
      return;
    }
    this._listeners[event].forEach(this._call(event, data));
  };

  _call = (event, data) => async (listener) => {
    try {
      await listener(data);
    } catch (err) {
      logger.error(`Failed to run listener for ${event}`, err.message);
    }
  };
}
