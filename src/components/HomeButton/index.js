import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import {hitSlop} from 'src/utils/sizes';
import image from './image.png';

export default class Button extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity {...this.props} hitSlop={hitSlop}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    );
  }
}

const size = rem(20);
export const width = size;
export const height = size;

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
});
