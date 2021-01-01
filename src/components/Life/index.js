import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import animation from './animation.json';

export default class Life extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: PropTypes.true,
  };

  _animation;

  componentDidMount() {
    const {visible} = this.props;
    if (visible) {
      this.show();
    }
  }

  componentDidUpdate(prevProps) {
    const {visible} = this.props;
    const appeared = !prevProps.visible && visible;
    if (appeared) {
      this.show();
    }

    const disappeared = prevProps.visible && !visible;
    if (disappeared) {
      this.hide();
    }
  }

  show = () => {
    return this._animation?.play(0, 40);
  };

  hide = () => {
    return this._animation?.play(0, 4);
  };

  registerAnimation = (ref) => {
    if (ref) {
      this._animation = ref;
    }
  };

  render() {
    return (
      <LottieView
        source={animation}
        style={styles.icon}
        loop={false}
        autoPlay={false}
        speed={1.5}
        ref={this.registerAnimation}
      />
    );
  }
}

export const size = rem(60);

const styles = StyleSheet.create({
  icon: {
    width: size,
    height: size,
  },
});
