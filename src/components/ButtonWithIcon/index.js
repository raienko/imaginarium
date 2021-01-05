import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import {rem} from 'src/utils/units';
import colors from 'src/constants/colors';

export default class ButtonWithIcon extends React.PureComponent {
  static propTypes = {
    secondaryColor: PropTypes.string,
    iconName: PropTypes.string,
    iconFont: PropTypes.any,
    style: PropTypes.any,
  };

  static defaultProps = {
    primaryColor: colors.dark,
    secondaryColor: colors.white,
    iconName: 'home',
    iconFont: undefined,
    style: undefined,
  };

  render() {
    const {secondaryColor, iconName, iconFont, style} = this.props;
    return (
      <Button {...this.props} style={[styles.wrapper].concat(style)}>
        <Icon
          style={[styles.icon, {color: secondaryColor}]}
          name={iconName}
          font={iconFont}
        />
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse',
  },
  icon: {
    width: rem(50),
    textAlign: 'left',
  },
});
