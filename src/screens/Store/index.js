import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import Screen from 'src/components/Screen';
import H1 from 'src/components/H1';
import H3 from 'src/components/H3';
import Header from 'src/components/Header';
import navigation from 'src/navigation';
import {offset} from 'src/constants/sizes';
import BackButton from 'src/components/BackButton';

export default class Store extends React.PureComponent {
  render() {
    return (
      <Screen style={styles.wrapper}>
        <Header>
          <BackButton onPress={navigation.back} />
        </Header>
        <H1 text="Store" />
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.container}>
          <View style={styles.product}>
            <H1 value="Premium subscription" />
            <H3 value="No ads, 200+ cards, cheatsheets..." />
          </View>
          <View style={styles.product}>
            <H1 value="Costumes" />
            <H3 value="Player's equipment to have unique look" />
          </View>
          <View style={styles.product}>
            <H1 value="Animations" />
            <H3 value="Unique association spelling animations" />
          </View>
          <View style={styles.product}>
            <H1 value="Win animation" />
            <H3 value="Unique win celebration animations" />
          </View>
          <View style={styles.product}>
            <H1 value="Reactions" />
            <H3 value="More reactions (like, dislike, love, etc..)" />
          </View>
          <View style={styles.product}>
            <H1 value="Cheetsheets" />
            <H3 value="List of random associations for each card" />
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  product: {
    marginTop: offset,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flexGrow: undefined,
  },
});
