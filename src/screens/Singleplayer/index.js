import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'src/components/Spinner';
import Board from 'src/components/Screen';
import BackButton from 'src/components/BackButton';
import navigation from 'src/navigation';
import Header from 'src/components/Header';
import Score from 'src/components/Score';
import LivesCounter from 'src/components/LivesCounter';
import {rem} from 'src/utils/units';
import * as gameActions from 'src/store/singleplayer/actions';
import Timer from 'src/components/Timer';
import Table from 'src/components/Table';

const mapStateToProps = (state) => ({
  game: state.singleplayer.game,
});

export default connect(mapStateToProps)(
  class Singleplayer extends React.PureComponent {
    static propTypes = {
      game: PropTypes.object,
    };

    static defaultProps = {
      game: null,
    };

    state = {
      loading: true,
      lives: 3,
      score: 30,
    };

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

    render() {
      const {loading, lives, score} = this.state;
      return (
        <Board>
          <Header style={styles.header}>
            <BackButton onPress={navigation.back} style={styles.back} />
            <LivesCounter value={lives} />
            <Score value={score} />
            <Timer />
          </Header>
          <Table />
          <Spinner visible={loading} />
        </Board>
      );
    }
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
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
