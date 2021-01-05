import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
  authorized: state.auth.authorized,
});

export default connect(mapStateToProps)(class IfAuthorized extends React.PureComponent {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const {authorized, children} = this.props;

    if (!authorized) {
      return null;
    }

    return children;
  }
});

