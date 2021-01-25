import React from 'react';
import {StyleSheet} from 'react-native';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import Screen from 'src/components/Screen';
import Character from 'src/components/Character';
import {rem} from 'src/utils/units';

export default class ViewPlayer extends React.PureComponent {
  render() {
    const player = navigation.getParam('player');
    if (!player) {
      return null;
    }
    return (
      <Screen style={styles.wrapper}>
        <Input style={styles.name} value={player.name} editable={false} />
        <Character style={styles.character} />
        <Button text="button.cancel" onPress={navigation.back} />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    textAlign: 'center',
  },
  character: {
    marginTop: rem(20),
  },
});
