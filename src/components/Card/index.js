import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

export default class Card extends React.PureComponent {
  static propTypes = {
    source: PropTypes.any.isRequired,
    scale: PropTypes.number,
  };

  static defaultProps = {
    scale: 1,
  };

  render() {
    const {source, scale} = this.props;

    const size = {
      width: width * scale,
      height: height * scale,
    };

    const image = typeof source === 'string' ? {uri: source} : source;
    return (
      <View style={styles.wrapper}>
        <Image style={[size, styles.image]} source={image} resizeMode="cover" />
      </View>
    );
  }
}

export const width = rem(150);
export const height = width * 1.5;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#696969',
    borderRadius: rem(1),
    borderWidth: rem(1),
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
    borderRadius: rem(6),
  },
});
