import React from 'react';
import {View, StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import PropTypes from 'prop-types';

export default class Toast extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
  };

  static defaultProps = {
    style: undefined,
  };

  render() {
    const {style, ...rest} = this.props;
    return <View style={[styles.wrapper].concat(style)} {...rest} />;
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(300),
    alignSelf: 'center',
    justifyContent: 'center',
    height: rem(50),
    borderRadius: rem(20),
    backgroundColor: 'yellow',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
