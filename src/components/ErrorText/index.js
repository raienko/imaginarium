import React from 'react';
import {StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import PropTypes from 'prop-types';
import colors from 'src/constants/colors';
import {offset} from 'src/constants/sizes';

export default class ErrorText extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
    value: PropTypes.string,
  };

  static defaultProps = {
    style: undefined,
    value: '',
  };

  render() {
    const {style, value, ...rest} = this.props;
    if (!value) {
      return null;
    }
    return <Text value={value} style={[styles.text].concat(style)} {...rest} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.red,
    marginTop: offset,
    textAlign: 'center',
  },
});
