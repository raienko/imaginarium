import React from 'react';
import {StyleSheet} from 'react-native';
import navigation from 'src/navigation';
import BackButton from 'src/components/BackButton';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import IfAuthorized from 'src/components/IfAuthorized';
import * as authActions from 'src/store/auth/actions';
import Screen from 'src/components/Screen';
import Header from 'src/components/Header';
import colors from 'src/constants/colors';

export default class Settings extends React.PureComponent {
  render() {
    return (
      <Screen style={styles.wrapper}>
        <Header>
          <BackButton onPress={navigation.back} />
        </Header>
        <IfAuthorized>
          <ButtonWithIcon
            text="button.remove_account"
            onPress={authActions.logout}
            iconName="trash"
            primaryColor={colors.red}
          />
          <ButtonWithIcon
            text="button.sign_out"
            onPress={authActions.logout}
            iconName="sign-out"
          />
        </IfAuthorized>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
