import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Text from 'src/components/Text';
import {rem} from 'src/utils/units';

export default class Players extends React.PureComponent {
  static propTypes = {
    players: PropTypes.array.isRequired,
    score: PropTypes.object.isRequired,
  };

  renderPlayer = (player, index) => {
    const {score} = this.props;
    return (
      <View style={styles.container} key={`${index}`}>
        <Image source={{uri: player.avatar}} style={styles.avatar} resizeMode="contain" />
        <View style={styles.scoreBox}>
          <Text value={score?.[player.id] || 0} style={styles.score} />
        </View>
      </View>
    );
  };

  render() {
    const {players} = this.props;
    return (
      <View style={styles.wrapper}>
        {players?.map(this.renderPlayer)}
      </View>
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
    top: rem(90),
    left: 0,
    right: 0,
  },
  container: {
    alignItems: 'center',
    margin: rem(10),
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
