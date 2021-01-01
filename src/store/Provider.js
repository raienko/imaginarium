import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import PropTypes from 'prop-types';
import store, {persistor} from './index';

export default function StoreProvider({children}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
