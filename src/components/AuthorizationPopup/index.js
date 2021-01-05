import React from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/Input';
import Popup from 'src/components/Popup';
import H1 from 'src/components/H1';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import Button from 'src/components/Button';
import * as authActions from 'src/store/auth/actions';

export default class AuthorizationPopup extends React.PureComponent {
  popup;
  phoneVerification;

  static propTypes = {
    onDismiss: PropTypes.func,
    onSuccess: PropTypes.func,
  };

  static defaultProps = {
    onDismiss: () => {},
    onSuccess: () => {},
  };

  state = {
    visible: false,
    phoneNumber: '',
    confirmationCode: '',
    phoneCodeValidator: null,
    codeSent: false,
  };

  show = () => {
    this.setState({visible: true});
  };

  hide = () => {
    this.hidePhoneVerification();
    this.setState({visible: false});
  };

  auth = async () => {
    const {onDismiss, onSuccess} = this.props;
    const {} = this.state;
    const authorized = true;
    if (authorized) {
      await authActions.auth();
      this.hide();
      return onSuccess();
    } else {
      return onDismiss();
    }
  };

  showPhoneVerification = () => {
    this.popup.hide();
    this.phoneVerification.show();
  };

  hidePhoneVerification = () => {
    this.phoneVerification.hide();
    this.setState({
      phoneNumber: '',
      confirmationCode: '',
      codeSent: false,
    });
  };

  stepBack = () => {
    this.hidePhoneVerification();
    this.show();
  };

  register = (key) => (ref) => {
    if (ref) {
      this[key] = ref;
    }
  };

  setPhoneNumber = (phoneNumber) => {
    this.setState({phoneNumber});
  };

  setConfirmationCode = (confirmationCode) => {
    this.setState({confirmationCode});
  };

  sendCode = () => {
    this.setState({codeSent: true});
  };

  verifyCode = () => {
    return this.auth();
  };

  render() {
    const {onDismiss} = this.props;
    const {visible, phoneNumber, confirmationCode, codeSent} = this.state;
    return (
      <>
        <Popup
          visible={visible}
          onDismiss={onDismiss}
          ref={this.register('popup')}>
          <H1 text="title.sign_in" />
          <ButtonWithIcon
            iconName="google"
            text="button.sign_in_google"
            onPress={this.auth}
          />
          <ButtonWithIcon
            iconName="apple"
            text="button.sign_in_apple"
            onPress={this.auth}
          />
          <ButtonWithIcon
            iconName="phone"
            text="button.sign_in_phone"
            onPress={this.showPhoneVerification}
          />
        </Popup>

        <Popup
          ref={this.register('phoneVerification')}
          onDismiss={this.stepBack}>
          <Input
            value={phoneNumber}
            editable={!codeSent}
            placeholder="form.phonenumber"
            onChangeText={this.setPhoneNumber}
            autoFocus={!codeSent}
            keyboardType="phone-pad"
          />
          {!codeSent && (
            <Button
              iconName="phone"
              text="form.send_code"
              disabled={!phoneNumber}
              onPress={this.sendCode}
            />
          )}
          {codeSent && (
            <>
              <Input
                value={confirmationCode}
                onChangeText={this.setConfirmationCode}
                placeholder="form.confirmation_code"
                autoFocus
                keyboardType="phone-pad"
              />
              <Button
                iconName="phone"
                text="form.verify"
                onPress={this.verifyCode}
              />
            </>
          )}
        </Popup>
      </>
    );
  }
}
