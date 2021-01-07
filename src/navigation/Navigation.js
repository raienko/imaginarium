import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from 'src/screens/Home';
import HowToPlay from 'src/screens/HowToPlay';
import Settings from 'src/screens/Settings';
import Game from 'src/screens/Game';
import Lobby from 'src/screens/Lobby';
import Store from 'src/screens/Store';
import Loading from 'src/screens/Loading';

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
          <Stack.Screen name="Lobby" component={Lobby} />
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
