import React from 'react';
import {Animated, StyleSheet, Easing, TouchableOpacity} from 'react-native';
import Card from 'src/components/Card';
import PropTypes from 'prop-types';

export default class FlippableCard extends React.PureComponent {
  static propTypes = {
    source: PropTypes.any.isRequired,
    flipped: PropTypes.bool,
    duration: PropTypes.number,
  };

  static defaultProps = {
    flipped: false,
    duration: 400,
  };

  _animation;

  _progress;

  constructor(props) {
    super(props);
    const {flipped} = this.props;
    this._progress = new Animated.Value(flipped ? 1 : 0);
    this.state = {
      flipped,
    };
  }

  flip = () => {
    const {flipped} = this.state;
    if (flipped) {
      return this.show();
    }
    return this.hide();
  };

  show = () => {
    this.setState({flipped: false});
    return this._animate(0);
  };

  hide = () => {
    this.setState({flipped: true});
    return this._animate(1);
  };

  _animate = (toValue) => {
    if (this._animation) {
      this._animation.stop();
    }

    return new Promise((resolve) => {
      const {onDidFlip, duration} = this.props;
      this._animation = new Animated.timing(this._progress, {
        toValue,
        duration,
        easing: Easing.linear,
        useNativeDriver: true,
      });

      this._animation.start(() => {
        if (onDidFlip) {
          onDidFlip(!!toValue);
        }
        resolve();
      });
    });
  };

  render() {
    const {source} = this.props;
    const {flipped} = this.state;

    const scale = {
      transform: [
        {
          scale: this._progress.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.009, 1],
          }),
        },
      ],
    };

    const frontSide = {
      opacity: this._progress.interpolate({
        inputRange: [0.5, 0.51],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      }),
      zIndex: flipped ? 0 : 1,
      transform: [
        {
          rotateY: this._progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };

    const backSide = {
      opacity: this._progress.interpolate({
        inputRange: [0.5, 0.51],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      zIndex: flipped ? 1 : 0,
      transform: [
        {
          rotateY: this._progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.wrapper, scale]}>
        <Animated.View style={[styles.back, backSide]}>
          <Card source="https://i.pinimg.com/originals/4a/2a/ef/4a2aef1bb8dd0d8a04492475f81d8588.png" />
        </Animated.View>
        <Animated.View style={frontSide}>
          <Card source={source} />
        </Animated.View>
        <TouchableOpacity onPress={this.flip} style={styles.overlay} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {

  },
  container: {

  },
  back: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 2,
  },
});
