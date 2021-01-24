import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import navigation from 'src/navigation';
import IfAuthorized from 'src/components/IfAuthorized';
import TouchableIcon from 'src/components/TouchableIcon';
import Logo from 'src/components/Logo';
import Header from 'src/components/Header';
import {isAuthorized} from 'src/utils/helpers';
import AuthorizationPopup from 'src/components/AuthorizationPopup';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import colors from 'src/constants/colors';
import Screen from 'src/components/Screen';
import * as gamesActions from 'src/store/games/actions';

export default class Home extends React.PureComponent {
  authPopup;

  state = {
    loading: false,
  };

  playGame = async (ranked) => {
    const authorized = isAuthorized();

    if (!authorized) {
      this.showAuthPopup();
      return;
    }

    if (ranked) {
      // search for game
    }

    await gamesActions.searchGame({ranked});
    return navigation.navigate('Queue');
  };

  playRanked = () => this.playGame(true);

  playWithFriends = () => this.playGame(false);

  play = async () => {
    const authorized = isAuthorized();
    if (!authorized) {
      navigation.navigate('Profile', {hasPlayBtn: true});
      return;
    }
    await gamesActions.searchGame();
    return navigation.navigate('Queue');
  };

  register = (key) => (ref) => {
    if (ref) {
      this[key] = ref;
    }
  };

  showAuthPopup = () => this.authPopup.show();

  hideAuthPopup = () => this.authPopup.hide();

  render() {
    return (
      <Screen style={styles.wrapper}>
        <IfAuthorized>
          <Header>
            <TouchableIcon
              name="shopping-cart"
              onPress={() => navigation.navigate('Store')}
            />
            <TouchableIcon
              name="user"
              onPress={() => navigation.navigate('Profile')}
            />
          </Header>
        </IfAuthorized>
        <Logo style={styles.logo} />
        <ButtonWithIcon
          text="button.ranked"
          onPress={this.playRanked}
          iconName="trophy"
          color={colors.blue}
        />
        <ButtonWithIcon
          text="button.play_with_friends"
          onPress={this.playWithFriends}
          iconName="users"
          color={colors.red}
        />
        <ButtonWithIcon
          text="button.play"
          onPress={this.play}
          color={colors.purple}
          iconName="play"
        />
        <ButtonWithIcon
          text="button.settings"
          onPress={() => navigation.navigate('Settings')}
          color={colors.yellow}
          iconName="cog"
        />
        <AuthorizationPopup
          ref={this.register('authPopup')}
          onSuccess={this.playGame}
          onDismiss={this.hideAuthPopup}
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
  logo: {
    marginBottom: rem(30),
  },
});
