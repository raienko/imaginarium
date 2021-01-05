import React from 'react';
import PropTypes from 'prop-types';
import {isAndroid} from 'src/utils/helpers';

export default class IfAndroid extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const {children} = this.props;

    if (!isAndroid) {
      return null;
    }

    return children;
  }
}
