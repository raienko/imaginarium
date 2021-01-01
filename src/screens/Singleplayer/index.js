import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'src/components/Spinner';
import HomeButton from 'src/components/HomeButton';
import navigation from 'src/navigation';
import Header from 'src/components/Header';
import Button from 'src/components/Button';
import Score from 'src/components/Score';
import Lives from 'src/components/Lives';
import {rem} from 'src/utils/units';
import * as gameActions from 'src/store/singleplayer/actions';

const mapStateToProps = (state) => ({
  game: state.singleplayer.game,
});

export default connect(mapStateToProps)(class Singleplayer extends React.PureComponent {
  static propTypes = {
    game: PropTypes.object,
  }

  static defaultProps = {
    game: null,
  }

  state = {
    loading: true,
    lives: 3,
    maxLives: 5,
  }

  async componentDidMount() {
    await this.start();
  }

  start = async () => {
    const {game} = this.props;
    if (!game) {
      await gameActions.createGame();
    }
    this.setState({loading: false});
  };

  addLife = () => {
    const { lives, maxLives } = this.state;
    if (lives >= maxLives) {
      return;
    }
    this.setState({ lives: lives + 1 });
  }

  removeLife = () => {
    const { lives } = this.state;
    if (lives <= 0) {
      return;
    }
    this.setState({ lives: lives - 1 });
  }

  render() {
    const {loading, lives} = this.state;
    return (
      <View style={styles.wrapper}>
        <Header style={styles.header}>
          <HomeButton onPress={navigation.back} style={styles.back} />
          <Lives value={lives} total={5} />
        </Header>
        <Button text="+" onPress={this.addLife} />
        <Button text="-" onPress={this.removeLife} />
        <Spinner visible={loading} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
  header: {
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: rem(10),
    alignSelf: 'center',
  },
  card: {
    margin: 10,
  },
  timer: {
    position: 'absolute',
    right: rem(10),
    alignSelf: 'center',
  },
});
