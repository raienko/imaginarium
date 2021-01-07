import React from 'react';
import {StyleSheet} from 'react-native';
import Screen from 'src/components/Screen';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import navigation from 'src/navigation';

export default class Loading extends React.PureComponent {
  render() {
    return (
      <Screen style={styles.wrapper}>
        <Text text="Loading..." />
        <Button text="ready" onPress={() => navigation.navigate('Game')} />
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
});
