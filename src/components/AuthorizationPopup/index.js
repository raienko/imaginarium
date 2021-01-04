import React from 'react';
import {StyleSheet} from 'react-native';
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
    const {visible, onDismiss} = this.props;
    return (
      <Popup visible={visible} onDismiss={onDismiss}>
        <Button text="Google" onPress={this.auth} />
        <Button text="Apple" onPress={this.auth} style={styles.btn} />
        <Button text="Phone number" onPress={this.auth} style={styles.btn} />
        <Button text="Play center" onPress={this.auth} style={styles.btn} />
        <Button text="Games center" onPress={this.auth} style={styles.btn} />
      </Popup>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: rem(10),
  },
});
