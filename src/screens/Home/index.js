import React from 'react';
import {View} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import navigation from 'src/navigation';

export default class Home extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text text="Home" />
        <Button text="play solo" onPress={() => navigation.navigate('SoloGame')} />
        <Button text="multiplayer" onPress={() => navigation.navigate('Multiplayer')} />
        <Button text="how to play" onPress={() => navigation.navigate('HowToPlay')} />
        <Button text="settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }
}
