import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

import err403 from './403.json';
import err404 from './404.json';
import err500 from './500.json';

const animations = {
  403: err403,
  404: err404,
  500: err500,
};

export default class ErrorAnimation extends React.PureComponent {
  static propTypes = {
    status: PropTypes.number,
  };

  static defaultProps = {
    status: 500,
  };

  render() {
    const {status} = this.props;
    return (
      <LottieView
        style={styles.animation}
        loop={false}
        autoPlay
        source={animations[status]}
      />
    );
  }
}

const styles = StyleSheet.create({
  animation: {
    width: rem(300),
    height: rem(300),
  },
});
