import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'src/screens/Home';
import HowToPlay from 'src/screens/HowToPlay';
import Settings from 'src/screens/Settings';
import SoloGame from 'src/screens/SoloGame';
import Multiplayer from 'src/screens/Multiplayer';

const Stack = createStackNavigator();

import {navigationRef} from './index';

export default class Navigation extends React.PureComponent {
  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="HowToPlay" component={HowToPlay} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="SoloGame" component={SoloGame} />
          <Stack.Screen name="Multiplayer" component={Multiplayer} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
