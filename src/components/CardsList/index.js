import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FlippableCard from 'src/components/FlippableCard';
import {rem} from 'src/utils/units';

export default class CardsList extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
  };

  _cards = [];

  static defaultProps = {
    cards: [],
  };

  componentDidMount() {
    setTimeout(this.showAll, 1000);
    setTimeout(this.hideAll, 5000);
  }

  renderCard = (card, index) => {
    return (
      <TouchableOpacity
        onPress={this.show(index)} style={styles.container}
        activeOpacity={1}
      >
        <FlippableCard
          ref={this.registerCard(index)}
          source={card.image}
          flipped
        />
      </TouchableOpacity>
    );
  };

  showAll = () => {
    this._cards.map(card => card.show());
  };

  hideAll = () => {
    this._cards.map(card => card.hide());
  };

  show = (index) => () => {
    this._cards[index]?.show();
  };

  registerCard = (index) => (ref) => {
    if (ref) {
      this._cards[index] = ref;
    }
  };

  render() {
    const {cards} = this.props;
    return (
      <View style={styles.wrapper}>
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: rem(40),
  },
  container: {
    transform: [
      {scale: 0.9},
    ],
  },
});
