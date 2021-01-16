import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import background from './poker.jpg';

export default class Table extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
    children: PropTypes.node,
  };

  static defaultProps = {
    style: null,
    children: null,
  };

  render() {
    const {style, children} = this.props;
    return (
      <View style={[styles.wrapper].concat(style)}>
        <Image source={background} style={styles.background} />
        {children}
      </View>
    );
  }
}

export const width = rem(250);
export const height = rem(350);
const borderWidth = rem(10);
const borderRadius = rem(80);

const styles = StyleSheet.create({
  wrapper: {
    width,
    height,
    borderWidth,
    borderColor: '#9E635A',
    borderRadius,
    position: 'absolute',
    bottom: rem(120),
    alignSelf: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width - borderWidth * 2,
    height: height - borderWidth * 2,
    borderRadius: borderRadius - borderWidth,
  },
});
