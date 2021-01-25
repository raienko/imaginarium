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
import Timer from 'src/components/Timer';
import Spinner from 'src/components/Spinner';
import {rem} from 'src/utils/units';
import CardsStack from 'src/components/CardsStack';
import Slot from 'src/components/Slot';
import Character from 'src/components/Character';
import CardsViewer from 'src/components/CardsViewer';
import Table from 'src/components/Table';
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

    cardsStack;

    state = {
      loading: true,
      members: [],
      hand: cards,
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

    submit = (index) => {
      this.cardViewer.hide();
      this.cardsStack.throw(index);
    };

    render() {
      const {loading, hand} = this.state;
      const players = fakePlayers;
      const association = 'Association';

      return (
        <Screen style={styles.wrapper}>
          <Header style={styles.header}>
            <TouchableIcon
              name="times"
              onPress={() => this.leavePopup.show()}
            />
            <H1 value={association} style={styles.association} />
          </Header>
          <Table>
            <Slot index={0}>
              <Character asset={0} />
            </Slot>
            <Slot index={1}>
              <Character asset={1} />
            </Slot>
            <Slot index={2}>
              <Character asset={2} />
            </Slot>
            <Slot index={3}>
              <Character asset={3} />
            </Slot>
            <Slot index={4}>
              <Character asset={4} />
            </Slot>
            <Slot index={5}>
              <Character asset={5} />
            </Slot>
          </Table>
          <CardsStack
            cards={hand}
            onPress={this.showCard}
            ref={this.register('cardsStack')}
          />

          <Timer style={styles.timer} ref={this.register('timer')} />
          <Footer />
          <Spinner visible={loading} />
          <Popup ref={this.register('leavePopup')}>
            <Button
              text="button.leave"
              onPress={() => {
                this.leavePopup.hide();
                gameActions.leaveGame();
              }}
              color={colors.white}
              textColor={colors.black}
            />
            <Button
              text="button.cancel"
              onPress={() => this.leavePopup.hide()}
            />
          </Popup>
          <CardsViewer
            ref={this.register('cardViewer')}
            cards={hand}
            onSubmit={this.submit}
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
    top: rem(80),
    right: rem(20),
  },
  association: {
    width: rem(300),
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const fakePlayers = [
  {
    character: 0,
    score: 20,
    name: 'John',
    id: 'asdas1231',
  },
  {
    character: 0,
    score: 0,
    name: 'Alice',
    id: 'asdas1231asd',
  },
  {
    character: 0,
    score: 9,
    name: 'Euyh',
    id: 'asASD1',
  },
  {
    score: 10,
    name: 'Sid',
    id: 'asdasasd1231',
  },
  {
    score: 20,
    name: 'Nance',
    id: 'asdas122g31',
  },
];
