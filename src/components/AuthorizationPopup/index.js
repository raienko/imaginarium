import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'src/components/Popup';
import H1 from 'src/components/H1';
import ErrorText from 'src/components/ErrorText';
import IfIOS from 'src/components/IfIOS';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import * as authActions from 'src/modules/auth/actions';
import * as authApi from 'src/modules/auth/api';
import PhoneVerificationPopup from 'src/components/PhoneVerificationPopup';
import colors from 'src/config/colors';

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
  };

  show = () => {
    this.setState({visible: true});
  };

  hide = () => {
    this.setState({visible: false});
  };

  auth = async () => {
    const {onDismiss, onSuccess} = this.props;
    const {} = this.state;
    const authorized = true;
    if (authorized) {
      await authActions.auth();
      await authActions.fetchProfile();
      this.hide();
      return onSuccess();
    } else {
      return onDismiss();
    }
  };

  showPhoneVerification = () => {
    this.clearError();
    this.hide();
    this.phoneVerification.show();
  };

  hidePhoneVerification = () => {
    this.phoneVerification.hide();
  };

  register = (key) => (ref) => {
    if (ref) {
      this[key] = ref;
    }
  };

  appleAuth = async () => {
    this.clearError();
    try {
      const authorized = await authApi.signInWithApple();
      if (!authorized) {
        this.setError('error.sign_in_failed');
        return;
      }
      await this.auth();
    } catch (err) {
      this.setError('error.sign_in_failed');
    }
  };

  clearError = () => {
    this.setState({error: ''});
  };

  setError = (error) => {
    this.setState({error});
  };

  stepBack = () => {
    this.phoneVerification.hide();
    this.show();
  };

  render() {
    const {onDismiss, onSuccess} = this.props;
    const {visible, error} = this.state;
    return (
      <>
        <Popup
          visible={visible}
          onDismiss={onDismiss}
          ref={this.register('popup')}>
          <H1 text="title.sign_in" />
          <ErrorText text={error} />
          <ButtonWithIcon
            iconName="google"
            text="button.sign_in_google"
            onPress={this.auth}
            color={colors.purple}
          />
          <IfIOS>
            <ButtonWithIcon
              iconName="apple"
              text="button.sign_in_apple"
              color={colors.black}
              onPress={this.appleAuth}
            />
          </IfIOS>
          <ButtonWithIcon
            iconName="phone"
            text="button.sign_in_phone"
            onPress={this.showPhoneVerification}
          />
        </Popup>
        <PhoneVerificationPopup
          ref={this.register('phoneVerification')}
          onSuccess={onSuccess}
          onDismiss={this.stepBack}
        />
      </>
    );
  }
}
