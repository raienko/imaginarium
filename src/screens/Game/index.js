import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Screen from 'src/components/Screen';
import H1 from 'src/components/H1';
import * as gameActions from 'src/store/games/actions';
import cards from 'src/cards';
import Header from 'src/components/Header';
import Button from 'src/components/Button';
import Footer from 'src/components/Footer';
import Players from 'src/components/Players';
import Timer from 'src/components/Timer';
import Spinner from 'src/components/Spinner';
import {rem} from 'src/utils/units';
import CardsStack from 'src/components/CardsStack';
import CardsViewer from 'src/components/CardsViewer';
import Table from 'src/components/Table';
import {wait} from 'src/utils/helpers';
import TouchableIcon from 'src/components/TouchableIcon';
import Popup from 'src/components/Popup';
import colors from 'src/constants/colors';

const mapStateToProps = (state) => ({
  currentGame: state.games.currentGame,
});

export default connect(mapStateToProps)(
  class Game extends React.PureComponent {
    timer;

    leavePopup;

    cardViewer;

    state = {
      loading: true,
      members: [],
    };

    async componentDidMount() {
      await this.start();
    }

    start = async () => {
      // await wait(3000);
      this.setState({loading: false});
      this.timer.start();
    };

    register = (key) => (ref) => {
      if (ref) {
        this[key] = ref;
      }
    };

    showCard = (index) => {
      this.cardViewer.show(index);
    };

    render() {
      const {loading} = this.state;
      const players = fakePlayers;
      const association = 'Association';
      const hand = cards;
      return (
        <Screen style={styles.wrapper}>
          <Header style={styles.header}>
            <TouchableIcon
              name="times"
              onPress={() => this.leavePopup.show()}
            />
            <H1 text={association} style={styles.association} />
          </Header>
          <Table />
          <Players players={players} />
          <CardsStack cards={hand} onPress={this.showCard} />
          <Timer style={styles.timer} ref={this.register('timer')} />
          <Footer />
          <Spinner visible={loading} />
          <Popup ref={this.register('leavePopup')}>
            <Button
              text="button.leave"
              onPress={() => gameActions.leaveGame()}
              primaryColor={colors.white}
              secondaryColor={colors.black}
            />
            <Button
              text="button.cancel"
              onPress={() => this.leavePopup.hide()}
            />
          </Popup>
          <CardsViewer
            association={association}
            ref={this.register('cardViewer')}
            cards={hand}
          />
        </Screen>
      );
    }
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
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
  timer: {
    position: 'absolute',
    top: rem(130),
    alignSelf: 'center',
  },
  association: {
    width: rem(300),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const fakePlayers = [
  {
    avatar:
      'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg',
  },
  {
    avatar:
      'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg',
  },
  {
    avatar:
      'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg',
  },
  {
    avatar:
      'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg',
  },
  {
    avatar:
      'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg',
  },
];
