import React from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import logo from './logo.png';

export default class Logo extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    size: rem(200),
    style: undefined,
  };

  render() {
    const {size, style} = this.props;
    return (
      <Image
        style={[{width: size, height: size}].concat(style)}
        source={logo}
        resizeMode="contain"
      />
    );
  }
}
