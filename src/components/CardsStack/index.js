import React from 'react';
import {Animated, View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Card, {width} from 'src/components/Card';
import {rem} from 'src/utils/units';
import FlippableCard from '../FlippableCard';

const scale = 0.5;

const transforms = [
  {
    rotation: -10,
    position: {
      left: rem(30),
      top: rem(10),
    },
  },
  {
    rotation: -5,
    position: {
      left: rem(70),
      top: rem(10),
    },
  },
  {
    rotation: 0,
    position: {
      top: rem(10),
    },
  },
  {
    rotation: 5,
    position: {
      right: rem(70),
      top: rem(10),
    },
  },
  {
    rotation: 10,
    position: {
      right: rem(30),
      top: rem(10),
    },
  },
];

export default class CardsStack extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    cards: [],
    onPress: () => {},
  };

  flippedCardPosition = new Animated.ValueXY();
  flippedCardScale = new Animated.Value(1);

  stack = [];

  renderCard = (card, index) => {
    const {onPress} = this.props;
    const offset = new Animated.ValueXY();

    this.stack[index] = {
      offset,
    };

    const {rotation, position} = transforms[index];

    const transform = [
      {rotate: `${rotation}deg`},
      ...this.stack[index].offset.getTranslateTransform(),
    ];

    return (
      <Animated.View key={card.id} style={[styles.card, position, {transform}]}>
        <Animated.View style={styles.draggable}>
          <TouchableOpacity onPress={() => onPress(index)}>
            <Card source={card.image} scale={scale} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  };

  throw = (index) => {
    if (this.animation) {
      this.animation.stop();
    }

    const card = this.stack[index];

    const moveCardOutOfHand = Animated.timing(card.offset, {
      toValue: {
        x: 0,
        y: 300,
      },
      duration: 1000,
      useNativeDriver: true,
    });

    this.flippedCardPosition.setValue({x: 0, y: 0});
    this.flippedCardScale.setValue(0);

    const throwFlippedCardOnTheTable = Animated.parallel([
      Animated.timing(this.flippedCardPosition, {
        toValue: {
          x: 0,
          y: -570,
        },
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(this.flippedCardScale, {
        toValue: 0.2,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    this.animation = Animated.sequence([
      moveCardOutOfHand,
      throwFlippedCardOnTheTable,
    ]);

    this.animation.start();
  };

  render() {
    const {cards} = this.props;
    const transform = [
      ...this.flippedCardPosition.getTranslateTransform(),
      {scale: this.flippedCardScale},
    ];
    return (
      <View style={styles.wrapper}>
        <Animated.View style={[styles.flipped, {transform}]}>
          <FlippableCard flipped source={cards[0].image} />
        </Animated.View>
        {cards.map(this.renderCard)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: rem(100),
    left: 0,
    right: 0,
    zIndex: 999999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: rem(20),
  },
  card: {
    position: 'absolute',
  },
  flipped: {
    position: 'absolute',
    bottom: -rem(600),
  },
});
