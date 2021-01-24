import React from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import localization, {updateOnLanguageChange} from 'locales';

export default updateOnLanguageChange(
  class CustomText extends React.PureComponent {
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
      const {text, value, children, options, ...rest} = this.props;
      return (
        <Text {...rest} allowFontScaling={false}>
          {text && localization.t(text, options)}
          {value}
          {children}
        </Text>
      );
    }
  },
);
