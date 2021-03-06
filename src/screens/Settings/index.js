import React from 'react';
import {StyleSheet} from 'react-native';
import navigation from 'src/navigation';
import BackButton from 'src/components/BackButton';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import IfAuthorized from 'src/components/IfAuthorized';
import * as auth from 'src/scripts/auth';
import Screen from 'src/components/Screen';
import H1 from 'src/components/H1';
import colors from 'src/config/colors';

export default class Settings extends React.PureComponent {
  render() {
    return (
      <Screen style={styles.wrapper}>
        <BackButton onPress={navigation.back} />
        <H1 value="Language" />
        <H1 value="Notifications" />
        <IfAuthorized>
          <ButtonWithIcon
            text="button.remove_account"
            onPress={auth.removeAccount}
            iconName="trash"
            color={colors.red}
          />
          <ButtonWithIcon
            text="button.sign_out"
            onPress={auth.logout}
            color={colors.gray}
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
