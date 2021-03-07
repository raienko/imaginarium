import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as system from 'src/scripts/system';
import NetworkStatus from './NetworkStatus';
import Sockets from './Sockets';

export default class System extends React.PureComponent {
  async componentDidMount() {
    await system.handleAppLaunched();
  }

  render() {
    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <SafeAreaView edges={['top']} mode="padding">
          <NetworkStatus />
          <Sockets />
        </SafeAreaView>
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
