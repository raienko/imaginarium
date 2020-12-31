import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
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
          <Button text="back" onPress={navigation.back} />
          <Text text={association} style={styles.association} />
          <Timer />
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
  association: {
    marginRight: rem(10),
  },
  card: {
    margin: 10,
  },
});
