import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetworkStatus from 'src/components/NetworkStatus';

export default class System extends React.PureComponent {
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
