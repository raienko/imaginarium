import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class Overlay extends React.PureComponent {
  render() {
    return <View style={styles.wrapper} pointerEvents="box-none" />;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
