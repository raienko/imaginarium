import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import PrimaryBtn from 'src/components/PrimaryBtn';
import SecondaryBtn from 'src/components/SecondaryBtn';
import navigation from 'src/navigation';
import * as authActions from 'src/store/auth/actions';
import background from './background.jpg';
import {isAuthorized} from 'src/utils/helpers';
import AuthorizationPopup from 'src/components/AuthorizationPopup';

export default class Home extends React.PureComponent {
  state = {
    loading: false,
  };

  playSingleplayer = () => {
    return navigation.navigate('Singleplayer');
  };

  searchMultiplayer = async () => {
    const authorized = isAuthorized();
    if (!authorized) {
      this.setState({authPopup: true})
      return;
    }
    this.setState({loading: true});
  };

  cancelSearch = async () => {
    this.setState({loading: false});
  };

  render() {
    return (
      <ImageBackground source={background} style={styles.wrapper}>
        <SecondaryBtn text="Ranked" onPress={authActions.auth} />
        <PrimaryBtn text="singleplayer" onPress={this.playSingleplayer} />
        <SecondaryBtn text="multiplayer" onPress={this.searchMultiplayer} />
        <AuthorizationPopup
          visible={this.state.authPopup}
          onSuccess={() => this.setState({authPopup: false})}
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
});
