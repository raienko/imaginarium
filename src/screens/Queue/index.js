import React from 'react';
import {StyleSheet} from 'react-native';
import H3 from 'src/components/H3';
import Button from 'src/components/Button';
import Screen from 'src/components/Screen';
import * as gamesActions from 'src/store/games/actions';
import navigation from 'src/navigation';

export default class Queue extends React.PureComponent {
  cancelSearch = async () => {
    await gamesActions.cancelGameSearch();
    navigation.back();
  };

  componentDidMount() {
    setTimeout(gamesActions.createGame, 1000);
  }

  render() {
    return (
      <Screen style={styles.wrapper}>
        <H3 text="Searching for partners" />
        <Button text="cancel" onPress={this.cancelSearch} />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
