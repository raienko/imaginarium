import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import navigation from 'src/navigation';

export default class Home extends React.PureComponent {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text text="Imaginarium" />
        <Button text="play solo" onPress={() => navigation.navigate('SoloGame')} />
        <Button text="multiplayer" onPress={() => navigation.navigate('Multiplayer')} />
        <Button text="how to play" onPress={() => navigation.navigate('HowToPlay')} />
        <Button text="settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: rem(40),
  },
});
