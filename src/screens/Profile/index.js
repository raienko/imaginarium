import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import navigation from 'src/navigation';
import Screen from 'src/components/Screen';
import Character from 'src/components/Character';
import BackButton from 'src/components/BackButton';
import {rem} from 'src/utils/units';
import TouchableIcon from 'src/components/TouchableIcon';
import * as userActions from 'src/store/user/actions';
import randomName from 'src/utils/randomName';
import Icon from 'src/components/Icon';

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
        name: profile.name,
        character: profile.character,
        valid: true,
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
      const {name, character} = this.state;
      this.setState({fetching: true});
      try {
        await userActions.updateUser({name, character});
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

    setName = (name) => {
      this.setState({name, valid: false}, this.validateWithDelay);
    };

    randomName = () => {
      const name = randomName();
      this.setName(name);
    };

    validate = () => {
      const {name} = this.state;
      const valid = name.length > 3;
      this.setState({valid});
    };

    validateWithDelay = () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.validate, 500);
    };

    render() {
      const {name, character, valid, fetching} = this.state;
      let error = '';
      const hasPlayBtn = navigation.getParam('hasPlayBtn');
      return (
        <Screen style={styles.wrapper}>
          <BackButton onPress={navigation.back} />
          <View style={styles.row}>
            <Input
              placeholder="name"
              error={error}
              value={name}
              editable={!fetching}
              onChangeText={this.setName}
              style={styles.input}
            />
            <TouchableIcon
              name="dice-5-outline"
              font={Icon.fonts.MaterialCommunityIcons}
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
