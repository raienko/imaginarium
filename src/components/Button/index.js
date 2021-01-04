import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';

export default class Button extends React.PureComponent {
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
    const {text, value, options, style, ...rest} = this.props;
    return (
      <TouchableOpacity {...rest} style={[styles.wrapper].concat(style)}>
        <Text text={text} value={value} options={options} style={styles.text} />
      </TouchableOpacity>
    );
  }
}

export const width = rem(280);
export const height = rem(40);

const styles = StyleSheet.create({
  wrapper: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: rem(10),
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    // textTransform: 'uppercase',
  },
});
