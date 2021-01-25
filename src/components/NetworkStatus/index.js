import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Toast from 'src/components/Toast';
import Icon from 'src/components/Icon';
import signalQuality from 'src/constants/signalQuality';
import * as systemActions from 'src/store/system/actions';

const mapStateToProps = (state) => ({
  signal: state.system.signal,
  online: state.system.online,
  connected: state.system.connected,
});

export default connect(mapStateToProps)(
  class NetworkStatus extends React.PureComponent {
    unsubscribe;

    static propTypes = {
      online: PropTypes.bool.isRequired,
      connected: PropTypes.bool.isRequired,
      signal: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
      this.unsubscribe = NetInfo.addEventListener(systemActions.pingServer);
    }

    async componentDidMount() {
      await systemActions.startSockets();
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const {online, signal, connected} = this.props;
      if (online && signal !== signalQuality.bad && connected) {
        return null;
      }
      return (
        <Toast style={styles.wrapper}>
          <View style={styles.cell}>
            <Icon name="wifi" color="#000" />
            <Icon name={online ? 'thumbs-up' : 'thumbs-down'} color="#000" />
          </View>
          <View style={styles.cell}>
            <Icon name="tachometer" color="#000" />
            <Icon
              name={signal === signalQuality.good ? 'thumbs-up' : 'thumbs-down'}
              color="#000"
            />
          </View>
          <View style={styles.cell}>
            <Icon name="server" color="#000" />
            <Icon name={connected ? 'thumbs-up' : 'thumbs-down'} color="#000" />
          </View>
        </Toast>
      );
    }
  },
);

const styles = StyleSheet.create({
  wrapper: {},
  cell: {
    flex: 1,
    marginHorizontal: rem(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
