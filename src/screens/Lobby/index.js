import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import BackButton from 'src/components/BackButton';
import Button from 'src/components/Button';
import Header from 'src/components/Header';
import Screen from 'src/components/Screen';
import FriendsList from 'src/components/FriendsList';
import navigation from 'src/navigation';

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
          text="button.play_with_friends"
          disabled={selected.length < 2 || selected.length > 4}
          options={{count: selected.length || ''}}
          onPress={() => navigation.navigate('Multiplayer')}
        />
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
    paddingTop: rem(220),
  },
});
