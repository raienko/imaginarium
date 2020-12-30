import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Card from 'src/components/Card';
import {rem} from 'src/utils/units';

export default class Deck extends React.PureComponent {
  state = {
    cards: [0, 1, 2, 3, 4, 5, 6],
  };

  renderCard = (card, index) => {
    const generic = {
      position: index ? 'absolute' : 'relative',
      zIndex: index,
      bottom: index * rem(5),
    };

    return (
      <View style={[styles.card, generic]} key={`${index}`}>
        <Card source="https://i.pinimg.com/originals/4a/2a/ef/4a2aef1bb8dd0d8a04492475f81d8588.png" />
      </View>
    )
  };

  render() {
    const {cards} = this.state;
    return (
      <View style={styles.wrapper}>
        {cards.map(this.renderCard)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    transform: [
      {scale: 0.8},
    ],
  },
  next: {
    position: 'absolute',
  },
});
