import React from 'react';
import {
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import Card from 'src/components/Card';
import {rem} from 'src/utils/units';

export default class CardsStack extends React.PureComponent {
  offset = [];

  animation;

  static propTypes = {
    cards: PropTypes.array,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    cards: [],
    onPress: () => {},
  };

  constructor(props) {
    super(props);
    const {cards} = props;
    this.offset = cards.map(() => new Animated.Value(0));
  }

  stack = [];

  throw = (index) => this.animate(index, false);

  show = (index) => this.animate(index, true);

  animate = (index, show) =>
    new Promise((resolve) => {
      if (this.animation) {
        this.animation.stop();
      }

      this.animation = Animated.timing(this.offset[index], {
        toValue: show ? 0 : 200,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      this.animation.start(resolve);
    });

  renderCard = (card, index) => {
    const {onPress} = this.props;
    const position = {
      transform: [{translateY: this.offset[index]}],
    };
    return (
      <Animated.View style={position} key={index}>
        <TouchableOpacity onPress={() => onPress(index)}>
          <Card source={card.image} scale={0.45} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  render() {
    const {cards} = this.props;
    return <View style={styles.wrapper}>{cards.map(this.renderCard)}</View>;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: rem(0),
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: rem(20),
  },
});
