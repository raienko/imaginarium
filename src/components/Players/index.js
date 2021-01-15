import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'src/components/Text';
import Userpick from 'src/components/Userpick';
import {rem} from 'src/utils/units';
import colors from 'src/constants/colors';
import navigation from 'src/navigation';

const colorsOrder = [
  colors.yellow,
  colors.purple,
  colors.blue,
  colors.red,
  colors.dark,
];

const positions = [
  {},
  {
    left: rem(10),
    top: rem(100),
  },
  {
    right: rem(10),
    top: rem(100),
  },
  {
    left: rem(40),
    top: rem(20),
  },
  {
    right: rem(40),
    top: rem(20),
  },
  {
    left: rem(10),
    top: rem(100),
  },
];

export default class Players extends React.PureComponent {
  static propTypes = {
    players: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired,
  };

  viewPlayer = (player) => () => {
    navigation.navigate('ViewPlayer', {player});
  };

  renderPlayer = (player, index) => {
    const {score} = this.props;
    const position = positions[index];
    return (
      <TouchableOpacity
        style={[styles.container].concat(position)}
        onPress={this.viewPlayer(player)}
        key={`${index}`}>
        <Userpick source={player.head} color={colorsOrder[index]} />
        <View style={styles.scoreBox}>
          <Text value={score?.[player.id] || 0} style={styles.score} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {players} = this.props;
    return (
      <View style={styles.wrapper}>{players?.map(this.renderPlayer)}</View>
    );
  }
}

export const width = rem(150);
export const height = width * 1.5;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexWrap: 'wrap',
    bottom: rem(430),
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    alignItems: 'center',
    margin: rem(5),
    position: 'absolute',
  },
  avatar: {
    borderRadius: rem(20),
    width: rem(40),
    height: rem(40),
    backgroundColor: '#e7b85c',
    borderWidth: 1,
  },
  scoreBox: {
    position: 'absolute',
    bottom: -rem(15),
    right: -rem(10),
    backgroundColor: '#000',
    width: rem(30),
    height: rem(30),
    borderRadius: rem(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
