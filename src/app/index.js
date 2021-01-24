import React from 'react';
import Navigator from 'src/navigation/Navigator';
import StoreProvider from 'src/store/Provider';
import System from 'src/screens/System';

export default class App extends React.PureComponent {
  render() {
    return (
      <StoreProvider>
        <Navigator />
        <System />
      </StoreProvider>
    );
  }
}
