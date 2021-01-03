import React from 'react';
import Navigation from 'src/navigation/Navigation';
import StoreProvider from 'src/store/Provider';
import Overlay from 'src/screens/Overlay';

export default class App extends React.PureComponent {
  render() {
    return (
      <StoreProvider>
        <Navigation />
        <Overlay />
      </StoreProvider>
    );
  }
}
