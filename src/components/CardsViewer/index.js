import React from 'react';
import {View, Modal, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import Button from 'src/components/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from 'src/config/colors';
import TouchableIcon from 'src/components/TouchableIcon';
import Card from 'src/components/Card';
import ButtonWithIcon from '../ButtonWithIcon';

export default class CardsViewer extends React.PureComponent {
  static propTypes = {
    cards: PropTypes.array,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    cards: [],
    onSubmit: () => {},
  };

  state = {
    active: 0,
    visible: false,
  };

  show = (active = 0) => {
    this.setState({visible: true, active});
  };

  hide = () => {
    this.setState({visible: false, active: 0});
  };

  next = () => {
    const {cards} = this.props;
    const {active} = this.state;
    const next = (active + 1) % cards.length;
    this.setState({active: next});
  };

  previous = () => {
    const {cards} = this.props;
    const {active} = this.state;
    const previous = active === 0 ? cards.length - 1 : active - 1;
    this.setState({active: previous});
  };

  submit = () => {
    const {onSubmit} = this.props;
    const {active} = this.state;
    return onSubmit(active);
  };

  render() {
    const {cards} = this.props;
    const {visible, active} = this.state;
    return (
      <Modal visible={visible} animationType="fade" transparent>
        <SafeAreaView
          style={styles.wrapper}
          edges={['top', 'bottom']}
          mode="padding">
          <TouchableOpacity onPress={this.hide} style={styles.overlay} />
          <Card source={cards[active].image} scale={2.3} />
          <View style={styles.footer}>
            <ButtonWithIcon
              iconName="arrow-left"
              onPress={this.previous}
              style={styles.arrow}
            />
            <Button
              text="button.play"
              onPress={this.submit}
              color={colors.green}
              style={styles.btn}
            />
            <ButtonWithIcon
              iconName="arrow-right"
              onPress={this.next}
              style={styles.arrow}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: rem(10),
    width: '100%',
  },
  btn: {
    width: rem(200),
  },
  arrow: {
    width: rem(70),
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
