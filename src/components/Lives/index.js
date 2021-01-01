import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Life from 'src/components/Life';
import {rem} from 'src/utils/units';

export default class Lives extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number,
    total: PropTypes.number,
  };

  static defaultProps = {
    value: 0,
    total: 5,
  };

  constructor(props) {
    super(props);
    const {total} = this.props;
    const lives = new Array(total).fill(true);
    this.state = {
      lives,
    };
  }

  renderLife = (life, index) => {
    const {value} = this.props;
    const active = index < value;
    const transform = [{translateX: -index * rem(30)}]
    return (
      <View style={{transform}} key={`${index}`}>
        <Life visible={active} />
      </View>
    );
  };

  render() {
    const {total} = this.props;
    const lives = new Array(total).fill(true);
    return (
      <View style={styles.wrapper}>
        {
          lives.map(this.renderLife)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
