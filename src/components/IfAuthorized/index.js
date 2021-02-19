import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  token: state.auth.accessToken,
});

export default connect(mapStateToProps)(
  class IfAuthorized extends React.PureComponent {
    static propTypes = {
      token: PropTypes.object,
      children: PropTypes.node.isRequired,
    };

    static defaultProps = {
      token: null,
    };

    render() {
      const {token, children} = this.props;

      if (!token) {
        return null;
      }

      return children;
    }
  },
);
