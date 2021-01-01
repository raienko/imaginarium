import React from 'react';
import Navigation from 'src/navigation/Navigation';
import StoreProvider from 'src/store/Provider';

export default class App extends React.PureComponent {
  render() {
    return (
      <StoreProvider>
        <Navigation />
      </StoreProvider>
    );
  }
}
