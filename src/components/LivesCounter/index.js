import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Life from 'src/components/Life';
import Text from 'src/components/Text';
import {rem} from 'src/utils/units';

export default class Lives extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
  };

  render() {
    const {value} = this.props;
    return (
      <View style={styles.wrapper}>
        <Life visible />
        <Text value={`x${value}`} style={styles.value} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 30,
    width: rem(40),
    marginLeft: -rem(15),
  },
});
