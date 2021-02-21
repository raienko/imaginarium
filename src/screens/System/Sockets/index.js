import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  token: state.auth.accessToken?.token,
  online: state.system.online,
});

export default connect(mapStateToProps)(
  class Sockets extends React.PureComponent {
    static propTypes = {
      token: PropTypes.string,
    };

    static defaultProps = {
      token: '',
    };

    componentDidMount() {
      this.check();
    }

    componentDidUpdate(prevProps) {
      this.check();
    }

    render() {
      return null;
    }
  },
);
