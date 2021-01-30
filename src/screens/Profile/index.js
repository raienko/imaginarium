import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import Screen from 'src/components/Screen';
import ErrorText from 'src/components/ErrorText';
import Character from 'src/components/Character';
import BackButton from 'src/components/BackButton';
import {rem} from 'src/utils/units';
import TouchableIcon from 'src/components/TouchableIcon';
import * as authActions from 'src/store/auth/actions';
import * as userActions from 'src/store/user/actions';
import * as gamesActions from 'src/store/games/actions';
import colors from 'src/constants/colors';
import {isAuthorized} from '../../utils/store';

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(
  class Profile extends React.PureComponent {
    static propTypes = {
      profile: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);
      const {profile} = this.props;

      this.state = {
        username: profile.username,
        character: profile.character,
        error: '',
        fetching: false,
      };
    }

    nextCharacter = () => {
      const {character} = this.state;
      const next = (character + 1) % Character.assets.length;
      this.setState({character: next});
    };

    previousCharacter = () => {
      const {character} = this.state;
      const previous = (character || Character.assets.length) - 1;
      this.setState({character: previous});
    };

    submit = async () => {
      const {profile} = this.props;
      const {username, character} = this.state;
      this.setState({fetching: true});
      const authorized = isAuthorized();
      try {
        if (!authorized) {
          await authActions.register({username, character});
          await userActions.fetchUser();
        }

        const usernameChanged = username !== profile.username;
        const charChanged = character !== profile.character;
        if (usernameChanged || charChanged) {
          await userActions.updateUser({username, character});
        }

        await gamesActions.searchGame();
        navigation.navigate('Queue');
      } catch (err) {}
      this.setState({fetching: false});
    };

    set = (key) => (value) => {
      this.setState({[key]: value, valid: false}, this.validateWithDelay);
    };

    validate = () => {
      const {username} = this.state;
      let error = '';
      if (username.length < 3) {
        error = 'error.name';
      }
      this.setState({error});
    };

    validateWithDelay = () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.validate, 500);
    };

    render() {
      const {username, character, error, fetching} = this.state;
      return (
        <Screen style={styles.wrapper}>
          <BackButton onPress={navigation.back} />
          <ErrorText text={error} />
          <Input
            placeholder="form.username"
            error={error}
            value={username}
            editable={!fetching}
            onChangeText={this.set('username')}
          />
          <View style={styles.container}>
            <Character asset={character} />
            <View style={styles.controls}>
              <TouchableIcon
                name="arrow-left"
                onPress={this.previousCharacter}
              />
              <TouchableIcon name="arrow-right" onPress={this.nextCharacter} />
            </View>
          </View>
          <Button
            text="button.next"
            color={colors.green}
            disabled={error || fetching}
            onPress={this.submit}
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
  },
  container: {
    marginTop: rem(20),
    width: rem(300),
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },
  head: {
    top: rem(40),
  },
  body: {
    top: rem(180),
  },
  row: {
    flexDirection: 'row',
    padding: rem(10),
  },
});
