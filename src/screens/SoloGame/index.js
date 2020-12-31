import React from 'react';
import {View, StyleSheet} from 'react-native';
import H1 from 'src/components/H1';
import HomeButton from 'src/components/HomeButton';
import navigation from 'src/navigation';
import cards from 'src/cards';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Timer from 'src/components/Timer';
import {rem} from 'src/utils/units';
import CardsList from 'src/components/CardsList';

export default class SoloGame extends React.PureComponent {
  render() {
    const set = cards;
    const association = set[0].associations[2];
    return (
      <View style={styles.wrapper}>
        <Header style={styles.header}>
          <HomeButton onPress={navigation.back} style={styles.back} />
          <H1 text={association} />
          <Timer style={styles.timer} />
        </Header>
        <CardsList cards={set} />
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
  header: {
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: rem(10),
    alignSelf: 'center',
  },
  card: {
    margin: 10,
  },
  timer: {
    position: 'absolute',
    right: rem(10),
    alignSelf: 'center',
  },
});
