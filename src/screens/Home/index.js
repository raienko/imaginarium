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

export default class Home extends React.PureComponent {
  authPopup;

  state = {
    loading: false,
  };

  playSingleplayer = () => {
    return navigation.navigate('Singleplayer');
  };

  playMultiplayer = async (ranked) => {
    const authorized = isAuthorized();
    if (!authorized) {
      this.showAuthPopup();
      return;
    }

    if (ranked) {
      // search for game
    }

    navigation.navigate('Lobby');
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
              style={styles.store}
              name="shopping-cart"
              onPress={() => navigation.navigate('Store')}
            />
          </Header>
        </IfAuthorized>
        <Logo style={styles.logo} />
        <ButtonWithIcon
          text="button.ranked"
          onPress={() => this.playMultiplayer(true)}
          iconName="trophy"
          disabled
          primaryColor={colors.blue}
        />
        <ButtonWithIcon
          text="button.singleplayer"
          onPress={this.playSingleplayer}
          iconName="play"
          primaryColor={colors.red}
          disabled
        />
        <ButtonWithIcon
          text="button.multiplayer"
          onPress={() => this.playMultiplayer(false)}
          primaryColor={colors.purple}
          iconName="users"
        />
        <ButtonWithIcon
          text="button.settings"
          onPress={() => navigation.navigate('Settings')}
          primaryColor={colors.yellow}
          iconName="cog"
        />
        <AuthorizationPopup
          ref={this.register('authPopup')}
          onSuccess={this.playMultiplayer}
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
  store: {},
});
