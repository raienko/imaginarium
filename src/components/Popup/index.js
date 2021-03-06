import React from 'react';
import {TouchableOpacity, View, Modal, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import shadow from 'src/config/shadow';
import {borderRadius, elementWidth} from 'src/config/sizes';
import KeyboardAvoidingView from 'src/components/KeyboardAvoidingView';

export default class Popup extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node,
    onDismiss: PropTypes.func,
    style: PropTypes.any,
  };

  static defaultProps = {
    visible: false,
    children: null,
    onDismiss: () => {},
    style: undefined,
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
    const {children, onDismiss, style} = this.props;
    const {visible} = this.state;

    return (
      <Modal
        visible={visible}
        transparent
        onRequestClose={onDismiss}
        statusBarTranslucent
        animationType="slide">
        <KeyboardAvoidingView style={styles.wrapper}>
          <TouchableOpacity style={styles.overlay} onPress={onDismiss} />
          <View style={[styles.container, shadow].concat(style)}>
            {children}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    width: elementWidth + borderRadius * 2,
    borderRadius,
    backgroundColor: '#fff',
    marginBottom: rem(40),
    padding: borderRadius,
    paddingTop: borderRadius / 2,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
