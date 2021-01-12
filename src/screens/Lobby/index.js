import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import BackButton from 'src/components/BackButton';
import Button from 'src/components/Button';
import Header from 'src/components/Header';
import Screen from 'src/components/Screen';
import FriendsList from 'src/components/FriendsList';
import navigation from 'src/navigation';
import colors from 'src/constants/colors';
import * as gameActions from 'src/store/games/actions';

export default class Lobby extends React.PureComponent {
  state = {
    selected: [],
  };

  handleSelected = (selected) => this.setState({selected});

  render() {
    const {selected} = this.state;
    return (
      <Screen style={styles.wrapper}>
        <Header>
          <BackButton onPress={navigation.back} />
        </Header>
        <FriendsList onSelectionChange={this.handleSelected} />
        <Button
          text="button.create_game"
          disabled={selected.length < 2 || selected.length > 5}
          primaryColor={colors.green}
          onPress={gameActions.createGame}
        />
        <Button
          text="button.find_game"
          disabled={selected.length < 1 || selected.length >= 5}
          onPress={gameActions.searchGame}
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
    paddingTop: rem(220),
  },
});
