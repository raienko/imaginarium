import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Popup from 'src/components/Popup';
import Button from 'src/components/Button';

export default class AuthorizationPopup extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onDismiss: PropTypes.func,
    onSuccess: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    onDismiss: () => {},
    onSuccess: () => {},
  };

  auth = async () => {
    const {onDismiss, onSuccess} = this.props;
    const authorized = true;
    if (authorized) {
      return onSuccess();
    } else {
      return onDismiss();
    }
  };

  render() {
    const {visible} = this.props;
    return (
      <Popup visible={visible}>
        <Button text="Google" onPres={this.auth} />
        <Button text="Apple" onPress={this.auth} />
        <Button text="Phone number" onPress={this.auth} />
        <Button text="Play center" onPress={this.auth} />
        <Button text="Games center" onPress={this.auth} />
      </Popup>
    );
  }
}

export const width = rem(150);
export const height = width * 1.5;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
    borderRadius: rem(10),
    borderWidth: rem(5),
    borderColor: '#fff',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 4,
  },
  image: {
    borderRadius: rem(6),
  },
});
