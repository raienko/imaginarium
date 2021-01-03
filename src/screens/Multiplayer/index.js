import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Board from 'src/components/Board';
import H1 from 'src/components/H1';
import HomeButton from 'src/components/HomeButton';
import navigation from 'src/navigation';
import cards from 'src/cards';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Players from 'src/components/Players';
import Timer from 'src/components/Timer';
import Spinner from 'src/components/Spinner';
import {rem} from 'src/utils/units';
import CardsStack from 'src/components/CardsStack';

const mapStateToProps = state => ({
  game: state.multiplayer.game,
});

export default connect(mapStateToProps)(
  class Multiplayer extends React.PureComponent {
    state = {
      loading: true,
      members: [],
    };

    async componentDidMount() {
      await this.start();
    }

    start = async () => {
      this.setState({loading: false});
    };

    render() {
      const {loading} = this.state;

      return (
        <Board>
          <CardsStack cards={[]} />
          <Header style={styles.header}>
            {/*<H1 text={association} />*/}
            <Timer style={styles.timer} />
            <HomeButton onPress={navigation.back} style={styles.back} />
          </Header>
          {/*<Players players={players} score={score} />*/}
          <Footer />
          <Spinner visible={loading} />
        </Board>
      );
    }
  });

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: rem(10),
    alignSelf: 'center',
  },
  timer: {
    position: 'absolute',
    right: rem(10),
    alignSelf: 'center',
  },
});
