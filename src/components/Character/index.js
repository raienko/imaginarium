import React from 'react';
import {Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import characters from 'src/characters';

export default class Character extends React.PureComponent {
  static propTypes = {
    asset: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    asset: 0,
    style: undefined,
  };

  static assets = characters;

  render() {
    const {style, asset} = this.props;
    return (
      <Image
        style={[styles.character].concat(style)}
        source={characters[asset]}
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
