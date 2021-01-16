import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {size} from 'src/components/CharacterV2';
import {height} from 'src/components/Table';
import {rem} from 'src/utils/units';
import chair from './chair.png';

export default class Slot extends React.PureComponent {
  static propTypes = {
    index: PropTypes.number,
    children: PropTypes.node,
  };

  static defaultProps = {
    index: 0,
    children: null,
  };

  render() {
    const {index, children} = this.props;

    return (
      <View style={[styles.wrapper, styles[index]]}>
        <Image style={styles.chair} source={chair} />
        {children}
      </View>
    );
  }
}

const offset = -size / 1.5;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: size,
    height: size,
  },
  chair: {
    position: 'absolute',
    width: rem(100),
    height: rem(100),
    alignSelf: 'center',
  },
  0: {
    top: offset,
    alignSelf: 'center',
  },
  1: {
    left: offset,
    top: height * 0.1,
    transform: [{rotate: '-90deg'}],
  },
  2: {
    right: offset,
    top: height * 0.1,
    transform: [{rotate: '90deg'}],
  },
  3: {
    left: offset,
    top: height * 0.5,
    transform: [{rotate: '-90deg'}],
  },
  4: {
    right: offset,
    top: height * 0.5,
    transform: [{rotate: '90deg'}],
  },
  5: {
    alignSelf: 'center',
    bottom: offset,
    transform: [{rotate: '-180deg'}],
  },
});
