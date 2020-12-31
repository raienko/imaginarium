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
    this.timer = setTimeout(this.showAll, 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  renderCard = (card, index) => {
    return (
      <TouchableOpacity
        onPress={this.show(index)} style={styles.card}
        activeOpacity={1}
        key={card.id}
      >
        <FlippableCard
          ref={this.registerCard(index)}
          source={card.image}
          flipped
          scale={0.8}
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
        <View style={styles.container}>
          {cards.map(this.renderCard)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    marginTop: rem(10),
    marginHorizontal: rem(10),
  },
});
