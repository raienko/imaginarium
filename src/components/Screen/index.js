import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import defaultBackground from './background.jpg';

export default class Screen extends React.PureComponent {
  static propTypes = {
    background: PropTypes.any,
  };

  static defaultProps = {
    background: defaultBackground,
  };

  render() {
    const {background, ...rest} = this.props;
    return (
      <ImageBackground
        style={styles.wrapper}
        source={background}
        blurRadius={20}>
        <SafeAreaView {...rest} edges={['top', 'bottom']} mode="padding" />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DDBE9C',
    paddingBottom: rem(20),
  },
});
