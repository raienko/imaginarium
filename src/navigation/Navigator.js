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
import Loading from 'src/screens/Loading';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="HowToPlay" component={HowToPlay} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="Lobby" component={Lobby} />
    <Stack.Screen name="Store" component={Store} />
  </Stack.Navigator>
);

const GameNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Loading" component={Loading} />
    <Stack.Screen name="Game" component={Game} />
    <Stack.Screen name="HowToPlay" component={HowToPlay} />
  </Stack.Navigator>
);

import {navigationRef} from './index';

const mapStateToProps = (state) => ({
  game: state.game.game,
});

export default connect(mapStateToProps)(
  class Navigator extends React.PureComponent {
    static propTypes = {
      game: PropTypes.object,
    };

    static defaultProps = {
      game: null,
    };

    render() {
      const {game} = this.props;

      let ActiveNavigator = MainNavigator;
      if (game) {
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
