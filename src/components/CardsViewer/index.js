import React from 'react';
import {
  View,
  Modal,
  Image,
  Easing,
  Animated,
  StyleSheet,
  PanResponder,
} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

export default class CardsViewer extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
  };

  stack = [];

  state = {
    visible: false,
  };

  handleCardMoved = (index) => (event, gestures) => {
    const card = this.stack[index];
    return Animated.event([null, {dx: card.position.x, dy: card.position.y}], {
      useNativeDriver: false,
    })(event, gestures);
  };

  handleCardReleased = (index) => (event, gestures) => {
    const card = this.stack[index];

    const offset = Math.abs(gestures.dx) + Math.abs(gestures.dy);

    if (offset >= 100) {
      console.log(`Card ${index} moved for ${offset} units`);
    }

    const animation = Animated.timing(card.position, {
      toValue: {x: 0, y: 0},
      duration: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    return animation.start();
  };

  renderCard = (item, index) => {
    const position = new Animated.ValueXY({x: 0, y: 0});
    const scale = new Animated.Value(1);
    const zIndex = new Animated.Value(index);

    const card = {
      position,
      scale,
      zIndex,
    };

    this.stack.push(card);

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this.handleCardMoved(index),
      onPanResponderRelease: this.handleCardReleased(index),
    });

    const transform = this.stack[index].position.getTranslateTransform();

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.container, {transform}]}
        key={`${index}`}>
        <Image style={styles.card} source={item.image} />
      </Animated.View>
    );
  };

  show = () => {
    this.setState({visible: true});
  };

  hide = () => {
    this.setState({visible: false});
  };

  render() {
    const {cards} = this.props;
    const {visible} = this.state;
    return (
      <Modal visible={visible} animationType="fade" transparent>
        <View style={styles.wrapper}>{cards.map(this.renderCard)}</View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    position: 'absolute',
  },
  card: {
    width: rem(360),
    height: rem(560),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: rem(10),
  },
});
