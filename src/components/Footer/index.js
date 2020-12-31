import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

export default class Header extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const {children} = this.props;
    return (
      <SafeAreaView mode="padding" style={styles.wrapper} edges={['bottom']}>
        <View style={styles.container}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    // backgroundColor: '#fdea33',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
