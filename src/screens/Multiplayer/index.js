import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Screen from 'src/components/Screen';
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
import Table from 'src/components/Table';
import colors from 'src/constants/colors';

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
      const players = [
        {avatar: 'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg'},
        {avatar: 'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg'},
        {avatar: 'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg'},
        {avatar: 'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg'},
        {avatar: 'https://t3.ftcdn.net/jpg/01/97/50/74/360_F_197507429_3tQOq6F5ce69rJHstB1y69mpnnVhqFgj.jpg'},
      ];
      const association = 'Some long asdasd as das dasdas as dasd asd';
      return (
        <Screen style={styles.wrapper}>
          <CardsStack cards={cards} />
          <Header style={styles.header}>
            <H1 text={association} style={styles.association} />
            <HomeButton onPress={navigation.back} style={styles.back} />
          </Header>
          <Table />
          <Players players={players} />
          <Timer style={styles.timer} />
          <Footer />
          <Spinner visible={loading} />
        </Screen>
      );
    }
  });

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
    top: rem(230),
    alignSelf: 'center',
  },
  association: {
    width: rem(300),
    marginLeft: rem(10),
    textAlign: 'center',
  },
});
