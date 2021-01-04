import React from 'react';
import TouchableIcon from 'src/components/TouchableIcon';

export default class Button extends React.PureComponent {
  render() {
    return <TouchableIcon {...this.props} name="chevron-left" />;
  }
}
