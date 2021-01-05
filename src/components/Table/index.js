import React from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import background from './background.jpg';

export default class Table extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
  };

  static defaultProps = {
    style: null,
  };

  render() {
    const {style} = this.props;
    return (
      <ImageBackground
        source={background}
        style={[styles.wrapper].concat(style)}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(200),
    height: rem(400),
    backgroundColor: 'red',
    borderRadius: rem(10),
    overflow: 'hidden',
    transform: [{perspective: rem(600)}, {rotateX: '20def'}],
    position: 'absolute',
    bottom: rem(150),
    alignSelf: 'center',
  },
});
