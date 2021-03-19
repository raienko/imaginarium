import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Screen from 'src/components/Screen';
import {fetchGame} from 'src/modules/games/actions';
import H1 from 'src/components/H1';
import * as gameActions from 'src/modules/games/actions';
import * as userActions from 'src/modules/user/actions';
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
import colors from 'src/config/colors';

const mapStateToProps = (state) => ({
  game: state.games.game,
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
      await fetchGame();
      this.setState({loading: false});
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

    leave = async () => {
      this.setState({loading: true});
      this.leavePopup.hide();
      await gameActions.leaveGame();
      await userActions.fetchUser();
    };

    render() {
      const {loading, hand} = this.state;
      const {game} = this.props;
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
            {game?.users?.map((user, slot) => (
              <Slot index={slot} key={slot}>
                <Character asset={user.character} />
              </Slot>
            ))}
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
              onPress={this.leave}
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
          {!game && <Spinner />}
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
