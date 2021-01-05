import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'src/components/Popup';
import H1 from 'src/components/H1';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import * as authActions from 'src/store/auth/actions';
import PhoneVerificationPopup from 'src/components/PhoneVerificationPopup';
import colors from 'src/constants/colors';

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
      this.hide();
      return onSuccess();
    } else {
      return onDismiss();
    }
  };

  showPhoneVerification = () => {
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

  render() {
    const {onDismiss, onSuccess} = this.props;
    const {visible} = this.state;
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
            primaryColor={colors.purple}
          />
          <ButtonWithIcon
            iconName="apple"
            text="button.sign_in_apple"
            primaryColor={colors.black}
            onPress={this.auth}
          />
          <ButtonWithIcon
            iconName="phone"
            text="button.sign_in_phone"
            onPress={this.showPhoneVerification}
          />
        </Popup>
        <PhoneVerificationPopup
          ref={this.register('phoneVerification')}
          onSuccess={onSuccess}
          onDismiss={this.show}
        />
      </>
    );
  }
}
