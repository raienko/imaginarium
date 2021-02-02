import React from 'react';
import {StyleSheet} from 'react-native';
import {rem} from 'src/utils/units';
import Screen from 'src/components/Screen';
import LoadingAnimation from 'src/components/LoadingAnimation';

export default class Loading extends React.PureComponent {
  render() {
    return (
      <Screen style={styles.wrapper}>
        <LoadingAnimation />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: rem(10),
  },
});
