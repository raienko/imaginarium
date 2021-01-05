import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Popup from 'src/components/Popup';
import H1 from 'src/components/H1';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import * as authActions from 'src/store/auth/actions';

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
      await authActions.auth();
      return onSuccess();
    } else {
      return onDismiss();
    }
  };

  render() {
    const {visible, onDismiss} = this.props;
    return (
      <Popup visible={visible} onDismiss={onDismiss}>
        <H1 text="title.sign_in" />
        <ButtonWithIcon iconName="google" text="button.sign_in_google" onPress={this.auth} style={styles.btn} />
        <ButtonWithIcon iconName="apple" text="button.sign_in_apple" onPress={this.auth} style={styles.btn} />
        <ButtonWithIcon iconName="phone" text="button.sign_in_phone" onPress={this.auth} style={styles.btn} />
      </Popup>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop: rem(10),
  },
});
