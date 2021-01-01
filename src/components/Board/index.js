import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import background from './background.jpg';

export default class Card extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const {children} = this.props;
    return (
      <ImageBackground style={styles.wrapper} source={background}>
        {children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DDBE9C',
  },
});
