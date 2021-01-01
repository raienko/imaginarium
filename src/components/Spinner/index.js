import React from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export default class Spinner extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
  };

  render() {
    const {visible} = this.props;
    return (
      <Modal
        animationType="fade"
        hardwareAccelerated
        statusBarTranslucent
        visible={visible}
        onRequestClose={() => {}}>
        <View style={styles.wrapper}>
          <ActivityIndicator color="#F00" size="large" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
