import React from 'react';
import {View} from 'react-native';
import Text from 'src/components/Text';
import Button from 'src/components/Button';
import navigation from 'src/navigation';

export default class HowToPlay extends React.PureComponent {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text text="How to play" />
        <Button text="back" onPress={navigation.back} />
      </View>
    );
  }
}
