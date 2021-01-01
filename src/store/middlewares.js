import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
  collapsed: true,
});

const rehydrationHandler = () => next => action => {
  if (action.type === 'persist/REHYDRATE') {
    // do something
  }

  return next(action);
};

const middlewares = [thunk, rehydrationHandler];

if (global.__DEV__) {
  middlewares.push(logger);
}

export default middlewares;
