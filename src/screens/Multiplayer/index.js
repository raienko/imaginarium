import React from 'react';
import {StyleSheet} from 'react-native';
import Board from 'src/components/Board';
import H1 from 'src/components/H1';
import HomeButton from 'src/components/HomeButton';
import navigation from 'src/navigation';
import cards from 'src/cards';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Timer from 'src/components/Timer';
import {rem} from 'src/utils/units';
import CardsStack from 'src/components/CardsStack';

export default class Multiplayer extends React.PureComponent {
  render() {
    const set = cards;
    const association = set[0].associations[2];
    return (
      <Board>
        <CardsStack cards={set} />
        <Header style={styles.header}>
          <H1 text={association} />
          <Timer style={styles.timer} />
          <HomeButton onPress={navigation.back} style={styles.back} />
        </Header>
        <Footer />
      </Board>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: rem(10),
    alignSelf: 'center',
  },
  timer: {
    position: 'absolute',
    right: rem(10),
    alignSelf: 'center',
  },
});
