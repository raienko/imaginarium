import React from 'react';
import {StyleSheet} from 'react-native';
import H3 from 'src/components/H3';
import Button from 'src/components/Button';
import Screen from 'src/components/Screen';
import * as gamesActions from 'src/modules/games/actions';
import navigation from 'src/navigation';
import logger from 'src/utils/logger';

export default class Queue extends React.PureComponent {
  cancelSearch = async () => {
    await gamesActions
      .cancelSearch()
      .catch((err) => logger.error('Failed to cancel game', err.message));
    navigation.navigate('Home');
  };

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
