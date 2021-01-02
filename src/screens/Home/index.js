import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import Button from 'src/components/Button';
import PrimaryBtn from 'src/components/PrimaryBtn';
import SecondaryBtn from 'src/components/SecondaryBtn';
import navigation from 'src/navigation';
import background from './background.jpg';

export default class Home extends React.PureComponent {
  render() {
    return (
      <ImageBackground source={background} style={styles.wrapper}>
        <SecondaryBtn text="Ranked" disabled onPress={() => navigation.navigate('Ranked')} />
        <PrimaryBtn text="singleplayer" onPress={() => navigation.navigate('Singleplayer')} />
        <SecondaryBtn text="multiplayer" onPress={() => navigation.navigate('Multiplayer')} />
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
