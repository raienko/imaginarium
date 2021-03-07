import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import colors from 'src/config/colors';
import shadow from 'src/config/shadow';
import placeholder from './placeholder.png';

export default class Userpick extends React.PureComponent {
  static propTypes = {
    source: PropTypes.any.isRequired,
    color: PropTypes.string,
  };

  static defaultProps = {
    source: undefined,
    color: colors.yellow,
  };

  render() {
    const {source, color} = this.props;

    const image = typeof source === 'string' ? {uri: source} : source;
    return (
      <View style={[styles.wrapper, shadow, {backgroundColor: color}]}>
        <Image
          style={styles.image}
          defaultSource={placeholder}
          source={image}
          resizeMode="contain"
        />
      </View>
    );
  }
}

export const size = rem(63);
export const imageSize = size * 0.8;

const styles = StyleSheet.create({
  wrapper: {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  },
});
