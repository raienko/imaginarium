import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(
  class IfAuthorized extends React.PureComponent {
    static propTypes = {
      token: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
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
