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
import randomName from 'src/utils/randomName';
import colors from 'src/constants/colors';
import Icon from 'src/components/Icon';

const mapStateToProps = (state) => ({
  token: state.auth.token,
  profile: state.user.profile,
});

export default connect(mapStateToProps)(
  class Profile extends React.PureComponent {
    static propTypes = {
      profile: PropTypes.object.isRequired,
      token: PropTypes.string.isRequired,
    };

    constructor(props) {
      super(props);
      const {profile} = this.props;

      this.state = {
        name: profile.name,
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
      const {token, profile} = this.props;
      const {name, character} = this.state;
      this.setState({fetching: true});
      try {
        if (!token) {
          await authActions.register({name, character});
          await userActions.fetchUser();
        }

        const nameChanged = name !== profile.name;
        const charChanged = character !== profile.character;
        if (nameChanged || charChanged) {
          await userActions.updateUser({name, character});
        }

        await gamesActions.searchGame();
        navigation.navigate('Queue');
      } catch (err) {}
      this.setState({fetching: false});
    };

    setName = (name) => {
      this.setState({name, valid: false}, this.validateWithDelay);
    };

    randomName = () => {
      const name = randomName();
      this.setName(name);
    };

    validate = () => {
      const {name} = this.state;
      let error = '';
      if (name.length < 3) {
        error = 'error.name';
      }
      this.setState({error});
    };

    validateWithDelay = () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.validate, 500);
    };

    render() {
      const {name, character, error, fetching} = this.state;
      const hasPlayBtn = navigation.getParam('hasPlayBtn');
      return (
        <Screen style={styles.wrapper}>
          <BackButton onPress={navigation.back} />
          <ErrorText text={error} />
          <View style={styles.row}>
            <Input
              placeholder="form.name"
              error={error}
              value={name}
              editable={!fetching}
              onChangeText={this.setName}
              style={styles.input}
            />
            <TouchableIcon
              name="dice"
              font={Icon.fonts.FontAwesome5}
              color={colors.yellow}
              onPress={this.randomName}
            />
          </View>
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
          {hasPlayBtn && (
            <Button
              text="button.play"
              disabled={error || fetching}
              onPress={this.submit}
            />
          )}
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
  input: {
    width: undefined,
    flex: 1,
    margin: rem(10),
  },
});
