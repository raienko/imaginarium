import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';

export default class CustomText extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    value: PropTypes.any,
    children: PropTypes.node,
    options: PropTypes.object,
  };

  static defaultProps = {
    text: '',
    value: undefined,
    children: null,
    options: undefined,
  };

  render() {
    const { text, value, children, options } = this.props;
    return (
      <Text>
        {text}
        {value}
        {children}
      </Text>
    );
  }
};
