import React from 'react';
import Navigator from 'src/navigation/Navigator';
import StoreProvider from 'src/store/Provider';
import Overlay from 'src/screens/Overlay';
import ws from 'src/utils/websocket';
import logger from 'src/utils/logger';

const s = new ws();
s.connect();

setTimeout(() => {
  s.send('hello', 'World');
}, 2000);

export default class App extends React.PureComponent {
  render() {
    return (
      <StoreProvider>
        <Navigator />
        <Overlay />
      </StoreProvider>
    );
  }
}
