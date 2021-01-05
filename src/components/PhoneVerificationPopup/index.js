import React from 'react';
import PropTypes from 'prop-types';
import Input from 'src/components/Input';
import Popup from 'src/components/Popup';
import Button from 'src/components/Button';
import ErrorText from 'src/components/ErrorText';
import * as authApi from 'src/store/auth/api';
import * as authActions from 'src/store/auth/actions';

export default class PhoneVerificationPopup extends React.PureComponent {
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
    codeValidator: null,
    codeSent: false,
  };

  show = () => {
    this.setState({visible: true, error: ''});
  };

  hide = () => {
    this.setState({visible: false, error: ''});
  };

  setPhoneNumber = (phoneNumber) => {
    this.setState({phoneNumber, error: ''});
  };

  sendCode = async () => {
    const {phoneNumber} = this.state;
    try {
      const codeValidator = await authApi.signInWithPhoneNumber(phoneNumber);
      this.setState({
        codeSent: true,
        codeValidator,
      });
    } catch (err) {
      this.setState({
        error: 'Incorrect phone number',
      });
    }
  };

  setConfirmationCode = (confirmationCode) => {
    this.setState({confirmationCode});
  };

  verifyCode = async () => {
    const {onSuccess} = this.props;
    const valid = true;

    if (valid) {
      this.hide();
      await authActions.auth();
      onSuccess();
    } else {
      this.setState({
        error: 'Invalid code',
      });
    }
  };

  render() {
    const {onDismiss} = this.props;
    const {
      visible,
      phoneNumber,
      confirmationCode,
      codeSent,
      error,
    } = this.state;

    return (
      <Popup visible={visible} onDismiss={onDismiss}>
        <Input
          value={phoneNumber}
          editable={!codeSent}
          placeholder="form.phonenumber"
          onChangeText={this.setPhoneNumber}
          autoFocus={!codeSent}
          keyboardType="phone-pad"
          error={!codeSent && error}
        />
        {!codeSent && <ErrorText value={error} />}
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
              error={error}
            />
            <ErrorText value={error} />
            <Button
              iconName="phone"
              text="form.verify"
              onPress={this.verifyCode}
            />
          </>
        )}
      </Popup>
    );
  }
}
