import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

export default class Header extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.any,
  };

  static defaultProps = {
    children: null,
    style: null,
  };

  render() {
    const {children, style} = this.props;
    return (
      <SafeAreaView mode="padding" style={styles.wrapper} edges={['top']}>
        <View style={[styles.container].concat(style)}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    padding: rem(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
