import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import {rem} from 'src/utils/units';
import colors from 'src/config/colors';

export default class ButtonWithIcon extends React.PureComponent {
  static propTypes = {
    textColor: PropTypes.string,
    iconName: PropTypes.string,
    iconFont: PropTypes.any,
    style: PropTypes.any,
  };

  static defaultProps = {
    color: colors.gray,
    textColor: colors.white,
    iconName: 'home',
    iconFont: undefined,
    style: undefined,
  };

  render() {
    const {textColor, iconName, iconFont, style} = this.props;
    return (
      <Button
        {...this.props}
        textStyle={styles.text}
        style={[styles.wrapper].concat(style)}>
        <Icon
          style={[styles.icon, {color: textColor}]}
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
  text: {
    textAlign: 'left',
    flex: 1,
  },
  icon: {
    width: rem(50),
    textAlign: 'center',
  },
});
