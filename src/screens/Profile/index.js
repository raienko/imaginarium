import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import Screen from 'src/components/Screen';
import Character from 'src/components/CharacterV2';
import BackButton from 'src/components/BackButton';
import {rem} from 'src/utils/units';
import TouchableIcon from 'src/components/TouchableIcon';
import * as userApi from 'src/store/user/api';
import * as userActions from 'src/store/user/actions';

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
        valid: false,
        fetching: false,
      };
    }

    next = (key) => () => {
      const current = this.state[key];
      const next = (current + 1) % Character.assets.length;
      this.setState({[key]: next});
    };

    previous = (key) => () => {
      const current = this.state[key];
      const previous = (current || Character.assets.length) - 1;
      this.setState({[key]: previous});
    };

    submit = async () => {
      const {username, character} = this.state;
      this.setState({fetching: true});
      try {
        await userActions.updateUser({username, character});
        this.setState({fetching: false});
      } catch (err) {
        this.setState({fetching: false, error: err.message});
      }
      // do something
    };

    play = async () => {
      const hasChanges = false;
      if (hasChanges) {
        await this.submit();
      }
      navigation.navigate('Queue');
    };

    setUsername = (username) => {
      this.setState({username}, this.validateWithDelay);
    };

    validate = () => {
      const {username} = this.state;
      const usernameValid = userApi.checkUsername(username);
      const valid = usernameValid && username.length > 3;
      this.setState({valid});
    };

    validateWithDelay = () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.validate, 1500);
    };

    render() {
      const {username, character, valid, fetching} = this.state;
      let error = '';
      if (username && !valid) {
        error = 'Username already taken';
      }
      const hasPlayBtn = navigation.getParam('hasPlayBtn');
      return (
        <Screen style={styles.wrapper}>
          <BackButton onPress={navigation.back} />
          <Input
            placeholder="username"
            error={error}
            editable={!fetching}
            onChangeText={this.setUsername}
          />
          <View style={styles.container}>
            <Character asset={character} />
            <View style={styles.controls}>
              <TouchableIcon
                name="arrow-left"
                onPress={this.previous('character')}
              />
              <TouchableIcon
                name="arrow-right"
                onPress={this.next('character')}
              />
            </View>
          </View>
          {hasPlayBtn && (
            <Button
              text="button.play"
              disabled={!valid || fetching}
              onPress={this.play}
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
});
