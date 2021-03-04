import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import Screen from 'src/components/Screen';
import KeyboardAvoidingView from 'src/components/KeyboardAvoidingView';
import ErrorText from 'src/components/ErrorText';
import BackButton from 'src/components/BackButton';
import {rem} from 'src/utils/units';
import * as authActions from 'src/modules/auth/actions';
import * as userActions from 'src/modules/user/actions';
import colors from 'src/constants/colors';

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
        password: '',
        error: '',
        fetching: false,
      };
    }

    submit = async () => {
      const {username, password} = this.state;
      this.setState({fetching: true});
      try {
        await authActions.auth(username, password);
        await userActions.fetchUser();
        navigation.navigate('Profile');
      } catch (err) {
        this.setState({fetching: false, error: err.message});
      }
    };

    set = (key) => (value) => {
      this.setState({[key]: value, error: ''});
    };

    render() {
      const {username, password, error, fetching} = this.state;

      const validUsername = username.length > 3;
      const validPassword = password.length > 3;
      const fulfilled = validUsername && validPassword;

      return (
        <Screen style={styles.wrapper}>
          <BackButton onPress={() => navigation.navigate('Home')} />
          <KeyboardAvoidingView>
            <ErrorText text={error} />
            <Input
              placeholder="form.username"
              value={username}
              editable={!fetching}
              onChangeText={this.set('username')}
            />
            <Input
              placeholder="form.password"
              value={password}
              editable={!fetching}
              onChangeText={this.set('password')}
            />
            <Button
              text="button.next"
              color={colors.green}
              disabled={!fulfilled || fetching}
              onPress={this.submit}
            />
          </KeyboardAvoidingView>
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
