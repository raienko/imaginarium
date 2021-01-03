import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import PrimaryBtn from 'src/components/PrimaryBtn';
import SecondaryBtn from 'src/components/SecondaryBtn';
import navigation from 'src/navigation';
import * as authActions from 'src/store/auth/actions';
import background from './background.jpg';
import * as multiplayerActions from 'src/store/multiplayer/actions';

export default class Home extends React.PureComponent {
  state = {
    loading: false,
  };

  searchGame = async () => {
    this.setState({loading: true});
  };

  cancelSearch = async () => {
    this.setState({loading: false});
  };

  render() {
    const {loading} = this.state;
    return (
      <ImageBackground source={background} style={styles.wrapper}>
        <SecondaryBtn text="Ranked" onPress={authActions.auth} />
        <PrimaryBtn text="singleplayer" onPress={() => navigation.navigate('Singleplayer')} />
        <SecondaryBtn text="multiplayer" onPress={multiplayerActions.searchGame} />
        {/*<Button text="how to play" onPress={() => navigation.navigate('HowToPlay')} />*/}
        {/*<Button text="settings" onPress={() => navigation.navigate('Settings')} />*/}
        {/*<Button text="store" onPress={() => navigation.navigate('Store')} />*/}
      </ImageBackground>
    );
  }
}

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
