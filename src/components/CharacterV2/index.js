import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

import char0 from './assets/char_0.png';
import char1 from './assets/char_1.png';
import char2 from './assets/char_2.png';
import char3 from './assets/char_3.png';
import char4 from './assets/char_4.png';
import char5 from './assets/char_5.png';

const assets = [char0, char1, char2, char3, char4, char5];

export default class Character extends React.PureComponent {
  static propTypes = {
    asset: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    asset: 0,
    style: undefined,
  };

  static assets = assets;

  render() {
    const {style, asset} = this.props;
    return (
      <Image
        style={[styles.character].concat(style)}
        source={assets[asset]}
        resizeMode="contain"
      />
    );
  }
}

export const size = rem(150);

const styles = StyleSheet.create({
  character: {
    width: size,
    height: size,
  },
});
