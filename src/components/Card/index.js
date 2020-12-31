import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

export default class Card extends React.PureComponent {
  static propTypes = {
    source: PropTypes.any.isRequired,
  };

  render() {
    const {source} = this.props;
    const image = typeof source === 'string' ? {uri: source} : source;
    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.image}
          source={image}
          resizeMode="cover"
        />
      </View>
    );
  }
}

export const width = rem(150);
export const height = width * 1.5;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: rem(10),
    borderWidth: rem(5),
    borderColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 4,
  },
  image: {
    width,
    height,
    borderRadius: rem(6),
  },
});
