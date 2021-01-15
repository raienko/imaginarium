import React from 'react';
import {View, StyleSheet} from 'react-native';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import Screen from 'src/components/Screen';
import Character from 'src/components/Character';
import {rem} from 'src/utils/units';
import TouchableIcon from 'src/components/TouchableIcon';

export default class CharacterSetup extends React.PureComponent {
  state = {
    name: '',
    head: 0,
    body: 0,
  };

  next = (key) => () => {
    const current = this.state[key];
    const next = (current + 1) % Character.assets[key].length;
    this.setState({[key]: next});
  };

  previous = (key) => () => {
    const current = this.state[key];
    const previous = (current || Character.assets[key].length) - 1;
    this.setState({[key]: previous});
  };

  render() {
    const {head, body} = this.state;
    return (
      <Screen style={styles.wrapper}>
        <Input placeholder="name" />
        <View style={styles.container}>
          <Character
            head={Character.assets.head[head]}
            body={Character.assets.body[body]}
          />
          <View style={[styles.controls, styles.head]}>
            <TouchableIcon name="arrow-left" onPress={this.previous('head')} />
            <TouchableIcon name="arrow-right" onPress={this.next('head')} />
          </View>
          <View style={[styles.controls, styles.body]}>
            <TouchableIcon name="arrow-left" onPress={this.previous('body')} />
            <TouchableIcon name="arrow-right" onPress={this.next('body')} />
          </View>
        </View>
        <Button text="button.play" onPress={navigation.back} />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: rem(20),
  },
  controls: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
  head: {
    top: rem(40),
  },
  body: {
    top: rem(180),
  },
});
