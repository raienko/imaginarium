import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {rem} from 'src/utils/units';
import navigation from 'src/navigation';
import H1 from 'src/components/H1';
import {isAuthorized} from 'src/utils/helpers';
import AuthorizationPopup from 'src/components/AuthorizationPopup';
import {searchGame} from 'src/store/multiplayer/actions';
import ButtonWithIcon from 'src/components/ButtonWithIcon';
import colors from 'src/constants/colors';
import Screen from 'src/components/Screen';

const mapStateToProps = (state) => ({
  searching: state.multiplayer.searching,
});

export default connect(mapStateToProps)(
  class Home extends React.PureComponent {
    state = {
      loading: false,
    };

    playSingleplayer = () => {
      return navigation.navigate('Singleplayer');
    };

    playMultiplayer = async (ranked) => {
      const authorized = isAuthorized();
      this.setState({authPopup: !authorized});
      if (!authorized) {
        return;
      }

      if (ranked) {
        // search for game
      }

      navigation.navigate('Lobby');
    };

    render() {
      return (
        <Screen style={styles.wrapper}>
          <H1 text="app_name" />
          <ButtonWithIcon
            text="button.ranked"
            onPress={() => this.playMultiplayer(true)}
            style={styles.btn}
            iconName="trophy"
            disabled
            primaryColor={colors.blue}
          />
          <ButtonWithIcon
            text="button.singleplayer"
            onPress={this.playSingleplayer}
            style={styles.btn}
            iconName="play"
            primaryColor={colors.red}
            disabled
          />
          <ButtonWithIcon
            text="button.multiplayer"
            onPress={() => this.playMultiplayer(false)}
            style={styles.btn}
            primaryColor={colors.purple}
            disabled={this.props.searching}
            iconName="users"
          />
          <ButtonWithIcon
            text="button.settings"
            onPress={() => navigation.navigate('Settings')}
            style={styles.btn}
            primaryColor={colors.yellow}
            iconName="cog"
          />
          <AuthorizationPopup
            visible={this.state.authPopup}
            onSuccess={this.searchMultiplayer}
            onDismiss={() => this.setState({authPopup: false})}
          />
        </Screen>
      );
    }
  },
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: rem(10),
  },
  btn: {
    marginTop: rem(10),
  },
});
