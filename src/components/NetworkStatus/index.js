import React from 'react';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import H2 from 'src/components/H2';
import Toast from 'src/components/Toast';
import signalQuality from 'src/constants/signalQuality';
import * as systemActions from 'src/store/system/actions';

const mapStateToProps = (state) => ({
  online: state.system.online,
  signal: state.system.signal,
});

export default connect(mapStateToProps)(
  class NetworkStatus extends React.PureComponent {
    unsubscribe;

    static propTypes = {
      online: PropTypes.bool.isRequired,
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
      const {online, signal} = this.props;
      if (online && signal !== signalQuality.bad) {
        return null;
      }
      return (
        <Toast>
          <H2 value={`Online: ${online} Signal: ${signal}`} />
        </Toast>
      );
    }
  },
);
