import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import H2 from 'src/components/H2';
import Toast from 'src/components/Toast';

const mapStateToProps = (state) => ({
  online: state.system.online,
  signal: state.system.signal,
});

export default connect(mapStateToProps)(
  class NetworkStatus extends React.PureComponent {
    static propTypes = {
      online: PropTypes.bool.isRequired,
      signal: PropTypes.string.isRequired,
    };

    render() {
      const {online, signal} = this.props;
      return (
        <Toast>
          <H2 value={`Online: ${online} Signal: ${signal}`} />
        </Toast>
      );
    }
  },
);
