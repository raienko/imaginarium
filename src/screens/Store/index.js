import React from 'react';
import {View} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import navigation from 'src/navigation';

export default class Settings extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text text="Store" />
        <Button text="back" onPress={navigation.back} />
      </View>
    );
  }
}
