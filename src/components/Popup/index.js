import React from 'react';
import {TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';

export default class Popup extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node,
    onDismiss: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    children: null,
    onDismiss: () => {},
  };

  constructor(props) {
    super(props);
    const {visible} = this.props;
    this.state = {
      visible,
    };
  }

  componentDidUpdate(prevProps) {
    const {visible} = this.props;
    const visibilityChanged = visible !== prevProps.visible;
    if (visibilityChanged) {
      this.setState({visible});
    }
  }

  show = () => {
    const {visible} = this.state;
    if (visible) {
      return;
    }
    this.setState({visible: true});
  };

  hide = () => {
    const {visible} = this.state;
    if (!visible) {
      return;
    }
    this.setState({visible: false});
  };

  render() {
    const {children, onDismiss} = this.props;
    const {visible} = this.state;

    return (
      <Modal
        visible={visible}
        transparent
        onRequestClose={onDismiss}
        statusBarTranslucent
        animationType="slide">
        <SafeAreaView style={styles.wrapper} edges="bottom" mode="padding">
          <TouchableOpacity style={styles.overlay} onPress={onDismiss} />
          <View style={styles.container}>
            {children}
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    width: rem(320),
    borderRadius: rem(10),
    backgroundColor: '#fff',
    padding: rem(10),
    // borderWidth: 1,
    // borderColor: '#ccc',
    alignItems: 'center',
    marginBottom: rem(40),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 4,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
