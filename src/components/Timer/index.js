import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Text from 'src/components/Text';

export default class Button extends React.PureComponent {
  static propTypes = {
    timeout: PropTypes.number,
    onTimeout: PropTypes.func,
  };

  static defaultProps = {
    timeout: 60000,
    onTimeout: () => {},
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
    const {timeLeft} = this.state;
    return (
      <Text value={timeLeft} style={styles.text} />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});
