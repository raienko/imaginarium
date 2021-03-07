import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';
import {elementWidth, elementHeight, elementFontSize} from 'src/config/sizes';
import colors from 'src/config/colors';
import {saturate} from 'src/utils/helpers';

export default class Button extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    textColor: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    offset: PropTypes.number,
    onPress: PropTypes.func,
    style: PropTypes.any,
    textStyle: PropTypes.any,
    disabled: PropTypes.bool,
    children: PropTypes.node,
  };

  static defaultProps = {
    color: colors.yellow,
    textColor: colors.white,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: rem(10),
    offset: rem(7),
    onPress: () => {},
    style: undefined,
    textStyle: undefined,
    disabled: false,
    children: null,
  };

  state = {
    pressed: false,
  };

  handlePress = () => {
    const {onPress} = this.props;
    requestAnimationFrame(onPress);
  };

  handlePressIn = () => this.setState({pressed: true});

  handlePressOut = () => this.setState({pressed: false});

  render() {
    const {
      color,
      style,
      offset,
      disabled,
      children,
      textColor,
      textStyle,
      borderRadius,
      borderColor,
      borderWidth,
      ...rest
    } = this.props;
    const {pressed} = this.state;

    const cof = 0.4;
    const offsets = {
      marginTop: pressed ? offset * (1 - cof) : 0,
      marginBottom: pressed ? offset * cof : offset,
    };

    const border = {
      borderRadius,
      borderColor,
      borderWidth,
    };

    const background = {
      backgroundColor: saturate(color, -0.3),
    };

    const foreground = {
      backgroundColor: pressed ? saturate(color, 0.3) : color,
    };

    return (
      <TouchableOpacity
        onPress={this.handlePress}
        activeOpacity={1}
        disabled={disabled}
        pointerEvents="box"
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        style={[styles.wrapper, disabled && styles.disabled].concat(style)}>
        <View style={[styles.background, background, border]} />
        <View
          style={[styles.foreground, offsets, foreground, border]}
          pointerEvents="none">
          {children}
          <Text
            {...rest}
            style={[styles.text, {color: textColor}].concat(textStyle)}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: elementWidth,
    height: elementHeight,
    marginTop: rem(10),
  },
  foreground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: rem(20),
  },
  background: {
    position: 'absolute',
    height: '70%',
    bottom: 0,
    left: 0,
    right: 0,
  },
  disabled: {
    opacity: 0.1,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: elementFontSize,
    textTransform: 'uppercase',
    color: colors.white,
  },
});
