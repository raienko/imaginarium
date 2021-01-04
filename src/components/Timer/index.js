import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'src/components/Text';
import Icon from 'src/components/Icon';
import {rem} from 'src/utils/units';

export default class Button extends React.PureComponent {
  static propTypes = {
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
    style: PropTypes.any,
  };

  static defaultProps = {
    timeout: 60000,
    onTimeout: () => {},
    style: undefined,
  };

  _timer;

  constructor(props) {
    super(props);
    const {timeout} = this.props;
    this.state = {
      startedAt: undefined,
      timeLeft: timeout / 1000,
    };
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  start = () => {
    this.setState({startedAt: Date.now()});
    this._timer = setInterval(this.tick, 1000);
  };

  stop = () => {
    clearInterval(this._timer);
  };

  tick = () => {
    const {timeout, onTimeout} = this.props;
    const {startedAt} = this.state;
    const now = Date.now();
    const diff = now - startedAt;

    if (diff >= timeout) {
      this.stop();
      onTimeout();
      this.setState({timeLeft: 0});
      return;
    }

    const timeLeft = Math.floor((timeout - diff) / 1000);
    this.setState({timeLeft});
  };

  render() {
    const {style} = this.props;
    const {timeLeft} = this.state;
    return (
      <View style={[styles.wrapper].concat(style)}>
        <Icon name="clock-o" />
        <Text value={timeLeft} style={styles.text} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    width: rem(35),
    textAlign: 'left',
    marginLeft: rem(5),
  },
});
