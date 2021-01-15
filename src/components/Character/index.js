import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

import head0 from './assets/head_0.png';
import head1 from './assets/head_1.png';
import body0 from './assets/body_0.png';
import body1 from './assets/body_1.png';

const assets = {
  head: [head0, head1],
  body: [body0, body1],
};

export default class Character extends React.PureComponent {
  static propTypes = {
    head: PropTypes.number,
    body: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    head: assets.head[0],
    body: assets.body[0],
    style: undefined,
  };

  static assets = assets;

  render() {
    const {style, head, body} = this.props;
    return (
      <View style={[styles.wrapper].concat(style)}>
        <Image style={styles.head} source={head} resizeMode="contain" />
        <Image style={styles.body} source={body} resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    width: rem(100),
    height: rem(100),
    marginBottom: -rem(20),
    zIndex: 1,
  },
  body: {
    width: rem(200),
    height: rem(200),
  },
});
