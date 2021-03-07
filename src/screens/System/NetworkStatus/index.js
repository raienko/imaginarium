import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import H2 from 'src/components/H2';
import Toast from 'src/components/Toast';
import signalQuality from 'src/config/signalQuality';
import * as systemActions from 'src/modules/system/actions';

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

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return null;

      const {online, signal, connected} = this.props;
      if (!online) {
        return (
          <Modal visible>
            <View style={styles.wrapper}>
              <H2 value={online ? 'Server down' : 'Offline'} />
            </View>
          </Modal>
        );
      }

      if (signal === signalQuality.bad) {
        return (
          <Toast>
            <H2>Bad signal</H2>
          </Toast>
        );
      }

      return null;
    }
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
