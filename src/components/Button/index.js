import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';
import shadow from 'src/constants/shadow';
import {
  borderRadius,
  elementWidth,
  elementHeight,
  elementFontSize,
  offset,
} from 'src/constants/sizes';
import colors from 'src/constants/colors';

export default class Button extends React.PureComponent {
  static propTypes = {
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.object,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    disabled: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    primaryColor: colors.dark,
    secondaryColor: colors.white,
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
      primaryColor,
      secondaryColor,
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
        style={[
          {backgroundColor: primaryColor},
          styles.wrapper,
          shadow,
          disabled && styles.disabled,
        ].concat(style)}>
        <Text
          text={text}
          value={value}
          options={options}
          style={[styles.text, {color: secondaryColor}].concat(textStyle)}
        />
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: elementWidth,
    height: elementHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius,
    marginTop: offset,
    paddingHorizontal: borderRadius + rem(5),
  },
  disabled: {
    opacity: 0.1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: elementFontSize,
    textTransform: 'uppercase',
  },
});
