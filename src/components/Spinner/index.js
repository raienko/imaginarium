import React from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'src/config/colors';

export default class Spinner extends React.PureComponent {
  static propTypes = {
    animated: PropTypes.bool,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    animated: false,
    visible: false,
  };

  render() {
    const {visible, animated} = this.props;
    return (
      <Modal
        animationType={animated ? 'fade' : 'none'}
        hardwareAccelerated
        statusBarTranslucent
        visible={visible}
        transparent
        onRequestClose={() => {}}>
        <View style={styles.wrapper}>
          <ActivityIndicator color={colors.gray} size="large" />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
