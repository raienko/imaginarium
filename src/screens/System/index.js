import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as system from 'src/scripts/system';

export default class System extends React.PureComponent {
  async componentDidMount() {
    this.stop = await system.handleAppLaunched();
  }

  async componentWillUnmount() {
    this.stop();
  }

  render() {
    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <SafeAreaView edges={['top']} mode="padding" />
      </View>
    );
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
