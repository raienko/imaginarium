import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import TouchableIcon from 'src/components/TouchableIcon';
import colors from 'src/config/colors';

export default class BackButton extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
  };

  static defaultProps = {
    style: undefined,
  };

  render() {
    const {style} = this.props;
    return (
      <TouchableIcon
        {...this.props}
        style={[styles.wrapper].concat(style)}
        color={colors.gray}
        name="arrow-left"
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: rem(10),
    top: rem(20),
  },
});
