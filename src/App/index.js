import React from 'react';
import Navigator from 'src/navigation/Navigator';
import StoreProvider from 'src/store/Provider';
import Overlay from 'src/screens/Overlay';

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
