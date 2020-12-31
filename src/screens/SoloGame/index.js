import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import cards from 'src/cards';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Timer from 'src/components/Timer';
import {rem} from 'src/utils/units';
import FlippableCard from 'src/components/FlippableCard';

export default class SoloGame extends React.PureComponent {
  renderCard = ({item, index}) => {
    return (
      <View key={`${index}`} style={styles.card}>
        <FlippableCard source={item.image} />
      </View>
    );
  };

  render() {
    const set = cards;
    const association = set[0].associations[2];
    return (
      <View style={styles.wrapper}>
        <Header style={styles.header}>
          <Text text={association} style={styles.association} />
          <Timer />
        </Header>
        <FlatList
          data={set}
          renderItem={this.renderCard}
          horizontal
          keyExtractor={(item, index) => `${index}${Date.now()}`}
        />
        <Footer>
          <Button text="back" onPress={navigation.back} />
        </Footer>
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
