import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens();

import React from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PropTypes from 'prop-types';
import Home from 'src/screens/Home';
import HowToPlay from 'src/screens/HowToPlay';
import Settings from 'src/screens/Settings';
import Game from 'src/screens/Game';
import Lobby from 'src/screens/Lobby';
import Store from 'src/screens/Store';
import Queue from 'src/screens/Queue';
import CharacterSetup from 'src/screens/Profile';
import ViewPlayer from 'src/screens/ViewPlayer';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="CharacterSetup" component={CharacterSetup} />
    <Stack.Screen name="HowToPlay" component={HowToPlay} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Lobby" component={Lobby} />
    <Stack.Screen name="Store" component={Store} />
    <Stack.Screen name="Queue" component={Queue} />
  </Stack.Navigator>
);

const GameNavigator = () => (
  <Stack.Navigator headerMode="none" mode="modal">
    <Stack.Screen name="Game" component={Game} />
    <Stack.Screen name="ViewPlayer" component={ViewPlayer} />
    <Stack.Screen name="HowToPlay" component={HowToPlay} />
    <Stack.Screen name="Settings" component={Settings} />
  </Stack.Navigator>
);

import {navigationRef} from './index';

const mapStateToProps = (state) => ({
  currentGame: state.games.currentGame,
});

export default connect(mapStateToProps)(
  class Navigator extends React.PureComponent {
    static propTypes = {
      currentGame: PropTypes.object,
    };

    static defaultProps = {
      currentGame: null,
    };

    render() {
      const {currentGame} = this.props;

      let ActiveNavigator = MainNavigator;

      if (currentGame) {
        ActiveNavigator = GameNavigator;
      }

      return (
        <NavigationContainer ref={navigationRef}>
          <ActiveNavigator />
        </NavigationContainer>
      );
    }
  },
);
