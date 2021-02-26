import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as systemActions from 'src/store/system/actions';
import * as userActions from 'src/store/user/actions';
import ws from 'src/utils/websocket';

const mapStateToProps = (state) => ({
  token: state.auth.accessToken?.token,
});

export default connect(mapStateToProps)(
  class Sockets extends React.PureComponent {
    static propTypes = {
      token: PropTypes.string,
    };

    static defaultProps = {
      token: '',
    };

    constructor(props) {
      super(props);
      this.unsubscribe = ws.subscribe('message', (message) => {
        console.log('Message received: ', message);
        userActions.fetchUser();
      });
    }

    componentDidMount() {
      this.start();
    }

    componentDidUpdate(prevProps) {
      const {token} = this.props;
      const tokenChanged = token !== prevProps.token;
      if (tokenChanged) {
        token ? this.start() : this.stop();
      }
    }

    componentWillUnmount() {
      this.stop();
      this.unsubscribe();
    }

    start = () => {
      const {token} = this.props;
      return systemActions.startSockets(token);
    };

    stop = () => {
      return systemActions.stopSockets();
    };

    render() {
      return null;
    }
  },
);
