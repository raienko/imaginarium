import React from 'react';
import {StyleSheet} from 'react-native';
import Text from 'src/components/Text';
import PropTypes from 'prop-types';

export default class H3 extends React.PureComponent {
  static propTypes = {
    style: PropTypes.any,
  };

  static defaultProps = {
    style: undefined,
  };

  render() {
    const {style, ...rest} = this.props;
    return <Text style={[styles.text].concat(style)} {...rest} />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});
