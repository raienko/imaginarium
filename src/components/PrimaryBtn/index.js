import React from 'react';
import {ImageBackground, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';
import background from './background.png';

export default class PrimaryBtn extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    value: PropTypes.any,
    options: PropTypes.object,
    style: PropTypes.any,
  };

  static defaultProps = {
    text: '',
    value: undefined,
    options: undefined,
    style: undefined,
  };

  render() {
    const {text, value, options, style, disabled, ...rest} = this.props;
    return (
      <TouchableOpacity {...rest} style={style} activeOpacity={0.8} disabled={disabled}>
        <ImageBackground style={[styles.wrapper, disabled && styles.disabled]} source={background} resizeMode="contain">
          <Text text={text} value={value} options={options} style={styles.text} />
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

export const width = rem(200);
export const height = width * 0.39;

const styles = StyleSheet.create({
  wrapper: {
    width,
    height,
  },
  disabled: {
    opacity: 0.3,
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    top: height * 0.15,
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
