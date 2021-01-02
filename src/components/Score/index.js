import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';

export default class Score extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number,
    style: PropTypes.any,
  };

  static defaultProps = {
    value: 0,
    style: undefined,
  };

  render() {
    const {value, style} = this.props;
    return (
      <View style={[styles.wrapper].concat(style)}>
        <Text text="Score: " value={value} style={styles.text} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(150),
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});