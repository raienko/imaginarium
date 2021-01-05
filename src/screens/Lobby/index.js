import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import BackButton from 'src/components/BackButton';
import Button from 'src/components/Button';
import Header from 'src/components/Header';
import Screen from 'src/components/Screen';
import navigation from 'src/navigation';

export default class Lobby extends React.PureComponent {
  render() {
    return (
      <Screen style={styles.wrapper}>
        <Header>
          <BackButton onPress={navigation.back} />
        </Header>
        <Button
          text="Start"
          onPress={() => navigation.navigate('Multiplayer')}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: rem(10),
  },
  btn: {
    marginTop: rem(10),
  },
});
