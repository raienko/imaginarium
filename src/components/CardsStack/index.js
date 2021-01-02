import React from 'react';
import {Animated, View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Card, {width} from 'src/components/Card';
import {rem} from 'src/utils/units';
import hands from './hands.png';

const transforms = [
  [{rotate: '-10deg'}, {translateX: width * 1.6}, {translateY: width * 0.3}],
  [{rotate: '-5deg'}, {translateX: width * 0.8}, {translateY: width * 0.1}],
  [{rotate: '0deg'}],
  [{rotate: '5deg'}, {translateX: -width * 0.8}, {translateY: width * 0.15}],
  [{rotate: '10deg'}, {translateX: -width * 1.6}, {translateY: width * 0.4}],
];

export default class CardsStack extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
  };

  static defaultProps = {
    cards: [],
  };

  renderCard = (card, index) => {
    const transform = transforms[index];
    return (
      <View key={card.id} style={{transform}}>
        <Animated.View style={styles.draggable}>
          <Card source={card.image} />
        </Animated.View>
      </View>
    );
  };

  render() {
    const {cards} = this.props;
    return (
      <View style={styles.wrapper}>
        {/*<Image source={hands} style={styles.hands} resizeMode="contain" />*/}
        {cards.map(this.renderCard)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: rem(40),
  },
  hands: {
    position: 'absolute',
    width: rem(370),
    height: rem(300),
    bottom: -rem(100),
    marginRight: rem(20),
    alignSelf: 'center',
  },
});
