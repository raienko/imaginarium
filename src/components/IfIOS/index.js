import React from 'react';
import PropTypes from 'prop-types';
import {isIOS} from 'src/utils/helpers';

export default class IfIOS extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const {children} = this.props;

    if (!isIOS) {
      return null;
    }

    return children;
  }
}
