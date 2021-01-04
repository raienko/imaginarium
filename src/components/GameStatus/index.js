import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {rem} from 'src/utils/units';
import H1 from 'src/components/H1';
import navigation from 'src/navigation';
import * as multiplayerActions from 'src/store/multiplayer/actions';
import TouchableIcon from 'src/components/TouchableIcon';

const mapStateToProps = (state) => ({
  searching: state.multiplayer.searching,
});

export default connect(mapStateToProps)(
  class GameStatus extends React.PureComponent {
    static propTypes = {
      searching: PropTypes.bool,
    };

    static defaultProps = {
      searching: false,
    };

    componentDidUpdate(prevProps) {
      const {searching} = this.props;
      if (searching && !prevProps.searching) {
        setTimeout(() => {
          multiplayerActions.cancelSearch();
          navigation.navigate('Multiplayer');
        }, 2000);
      }
    }

    render() {
      const {searching} = this.props;
      if (!searching) {
        return null;
      }

      return (
        <SafeAreaView style={styles.wrapper} mode="padding" edges={['top']}>
          <View style={styles.container}>
            {
              searching && (
                <>
                  <H1 text="Searching..." />
                  <TouchableIcon name="times" onPress={multiplayerActions.cancelSearch} />
                </>
              )
            }
          </View>
        </SafeAreaView>
      );
    }
  },
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#f1c24c',
    shadowOpacity: 1,
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
  },
  container: {
    paddingVertical: rem(10),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
