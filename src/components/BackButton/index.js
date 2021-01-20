import React from 'react';
import TouchableIcon from 'src/components/TouchableIcon';
import colors from 'src/constants/colors';

export default class BackButton extends React.PureComponent {
  render() {
    return (
      <TouchableIcon {...this.props} color={colors.dark} name="arrow-left" />
    );
  }
}
