import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Input from 'src/components/Input';
import H3 from 'src/components/H3';
import PropTypes from 'prop-types';
import Userpick from 'src/components/Userpick';
import Icon from 'src/components/Icon';
import {elementWidth, offset, borderRadius} from 'src/config/sizes';
import {rem} from 'src/utils/units';
import shadow from 'src/config/shadow';
import colors from 'src/config/colors';

const fakeFriends = [
  {name: 'John', id: '1'},
  {name: 'Selipo', id: '2'},
  {name: 'silverton', id: '3'},
  {name: 'deemy', id: '4'},
  {name: 'korita', id: '5'},
  {name: 'loverik', id: '6'},
  {name: 'priscills', id: '7'},
];

export default class FriendsList extends React.PureComponent {
  timer;

  static propTypes = {
    onSelectionChange: PropTypes.func,
  };

  static defaultProps = {
    onSelectionChange: () => {},
  };

  state = {
    friends: [],
    selected: [],
    query: '',
  };

  componentDidMount() {
    this.search();
  }

  componentDidUpdate(prevProps, prevState) {
    const {query} = this.state;
    const queryChanged = query !== prevState.query;
    if (queryChanged) {
      this.searchWithDelay();
    }
  }

  renderFriend = ({item}) => {
    const {selected} = this.state;
    const isSelected = selected.includes(item.id);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.friend}
        onPress={() => this.toggleSelection(item.id)}>
        <Userpick source={item.avatar} />
        <H3 value={item.name} style={styles.name} />
        <Icon
          name={isSelected ? 'check-square' : 'square'}
          color={isSelected ? colors.yellow : colors.gray}
        />
      </TouchableOpacity>
    );
  };

  toggleSelection = (id) => {
    const {onSelectionChange} = this.props;
    const {selected} = this.state;
    const isSelected = selected.includes(id);
    let newSelection;
    if (isSelected) {
      newSelection = selected.filter((i) => i !== id);
    } else {
      newSelection = selected.concat(id);
    }
    this.setState({selected: newSelection});
    onSelectionChange(newSelection);
  };

  search = async () => {
    const {query} = this.state;
    if (!query) {
      this.setState({friends: fakeFriends});
      return;
    }
    const friends = fakeFriends.filter((i) =>
      i.name.toLowerCase().includes(query.toLowerCase()),
    );
    this.setState({friends});
  };

  searchWithDelay = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.search, 200);
  };

  setQuery = (query) => this.setState({query});

  render() {
    const {friends, query, selected} = this.state;

    return (
      <View style={[styles.wrapper, shadow]}>
        <Input
          value={query}
          onChangeText={this.setQuery}
          placeholder="form.search"
          style={styles.input}
        />
        <FlatList
          extraData={selected}
          data={friends}
          style={styles.list}
          contentContainerStyle={styles.container}
          renderItem={this.renderFriend}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    height: rem(350),
    width: elementWidth + offset * 2,
    borderRadius,
    backgroundColor: colors.white,
  },
  input: {
    alignSelf: 'center',
  },
  container: {
    paddingVertical: offset,
    alignItems: 'center',
  },
  name: {
    flex: 1,
    textAlign: 'left',
    paddingHorizontal: offset,
  },
  friend: {
    flexDirection: 'row',
    width: elementWidth,
    marginVertical: offset / 2,
    alignItems: 'center',
  },
});
