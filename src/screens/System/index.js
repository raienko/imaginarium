import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetworkStatus from 'src/components/NetworkStatus';
import * as systemActions from 'src/store/system/actions';

export default class System extends React.PureComponent {
  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  start = async () => {
    await systemActions.pingServer();
    await systemActions.startSockets();
  };

  stop = async () => {
    // inform server about disconnect
  };

  render() {
    return (
      <View style={styles.wrapper} pointerEvents="box-none">
        <SafeAreaView edges={['top']} mode="padding">
          <NetworkStatus />
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
