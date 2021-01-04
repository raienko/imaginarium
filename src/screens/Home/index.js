import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import Button from 'src/components/Button';
import PrimaryBtn from 'src/components/PrimaryBtn';
import SecondaryBtn from 'src/components/SecondaryBtn';
import navigation from 'src/navigation';
import * as authActions from 'src/store/auth/actions';
import background from './background.jpg';
import {isAuthorized} from 'src/utils/helpers';
import AuthorizationPopup from 'src/components/AuthorizationPopup';
import {searchGame} from 'src/store/multiplayer/actions';

export default class Home extends React.PureComponent {
  state = {
    loading: false,
  };

  playSingleplayer = () => {
    return navigation.navigate('Singleplayer');
  };

  searchMultiplayer = async () => {
    const authorized = isAuthorized();
    this.setState({authPopup: !authorized});
    if (!authorized) {
      return;
    }
    searchGame();
  };

  render() {
    return (
      <ImageBackground source={background} style={styles.wrapper}>
        <Button text="Ranked" onPress={authActions.auth} style={styles.btn} />
        <Button text="singleplayer" onPress={this.playSingleplayer} style={styles.btn} />
        <Button text="multiplayer" onPress={this.searchMultiplayer} style={styles.btn} />
        <AuthorizationPopup
          visible={this.state.authPopup}
          onSuccess={this.searchMultiplayer}
          onDismiss={() => this.setState({authPopup: false})}
        />
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: rem(40),
    paddingHorizontal: rem(10),
    backgroundColor: '#DDBE9C',
  },
  btn: {
    marginTop: rem(10),
  },
});
