import React from 'react';
import {View} from 'react-native';
import FlippableCard from 'src/components/FlippableCard';
import Deck from 'src/components/Deck';

export default class App extends React.PureComponent {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <FlippableCard source="https://i.pinimg.com/474x/c1/22/05/c1220572f734a6d83093951b47a7a19c.jpg" />
        <Deck />
      </View>
    );
  }
}
