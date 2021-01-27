import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import ButtonWithIcon from 'src/components/ButtonWithIcon';

export default class TouchableIcon extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    font: PropTypes.any,
    style: PropTypes.any,
  };

  static defaultProps = {
    style: undefined,
  };

  render() {
    const {style, name, font, ...rest} = this.props;

    return (
      <ButtonWithIcon
        {...rest}
        style={[styles.wrapper].concat(style)}
        iconName={name}
        iconFont={font}
      />
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: rem(70),
  },
});
