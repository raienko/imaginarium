import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import navigation from 'src/navigation';
import IfAuthorized from 'src/components/IfAuthorized';
import TouchableIcon from 'src/components/TouchableIcon';
import Logo from 'src/components/Logo';
import Header from 'src/components/Header';
import {isAuthorized} from 'src/utils/store';
import AuthorizationPopup from 'src/components/AuthorizationPopup';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import colors from 'src/constants/colors';
import Screen from 'src/components/Screen';
import * as gamesActions from 'src/store/games/actions';

export default class Home extends React.PureComponent {
  authPopup;

  play = async () => {
    const authorized = isAuthorized();
    if (!authorized) {
      navigation.navigate('Auth');
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
          onPress={() => navigation.navigate('Lobby', {ranked: true})}
          iconName="trophy"
          color={colors.blue}
        />
        <ButtonWithIcon
          text="button.play_with_friends"
          onPress={() => navigation.navigate('Lobby')}
          iconName="users"
          color={colors.red}
        />
        <ButtonWithIcon
          text="button.play"
          onPress={this.play}
          color={colors.green}
          iconName="play"
        />
        <ButtonWithIcon
          text="button.settings"
          onPress={() => navigation.navigate('Settings')}
          color={colors.yellow}
          iconName="cog"
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
