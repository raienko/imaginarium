import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'src/components/Icon';

export default class TouchableIcon extends React.PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    style: PropTypes.any,
  };

  static defaultProps = {
    onPress: () => {},
    disabled: false,
    style: undefined,
  };

  render() {
    const {disabled, style, onPress, ...rest} = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={style}
        hitSlop={{
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
        }}>
        <Icon {...rest} />
      </TouchableOpacity>
    );
  }
}
