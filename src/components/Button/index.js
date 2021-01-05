import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';
import shadow from 'src/constants/shadow';
import {borderRadius} from 'src/constants/sizes';

export default class Button extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.object,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    disabled: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    text: '',
    value: undefined,
    options: undefined,
    style: undefined,
    textStyle: undefined,
    disabled: false,
    children: null,
  };

  render() {
    const {
      text,
      value,
      style,
      options,
      disabled,
      children,
      textStyle,
      ...rest
    } = this.props;

    return (
      <TouchableOpacity
        {...rest}
        disabled={disabled}
        style={[styles.wrapper, shadow, disabled && styles.disabled].concat(style)}
      >
        <Text
          text={text}
          value={value}
          options={options}
          style={[styles.text].concat(textStyle)}
        />
        {children}
      </TouchableOpacity>
    );
  }
}

export const width = rem(320);
export const height = width * 0.23;

const styles = StyleSheet.create({
  wrapper: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius,
    marginTop: rem(10),
    paddingHorizontal: borderRadius + rem(5),
  },
  disabled: {
    opacity: 0.1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    textTransform: 'uppercase',
  },
});
