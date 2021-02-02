import React from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {rem} from 'src/utils/units';
import * as systemActions from 'src/store/system/actions';
import * as userActions from 'src/store/user/actions';
import animation from './loading.json';
import {wait} from '../../utils/helpers';

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(
  class LoadingAnimation extends React.PureComponent {
    static propTypes = {
      token: PropTypes.object,
    };

    static defaultProps = {
      token: null,
    };

    async componentDidMount() {
      const {token} = this.props;
      const authorized = !!token;
      await systemActions.pingServer();
      if (authorized) {
        await systemActions.startSockets();
        await userActions.fetchUser();
      }
      await wait(5000);
      await systemActions.setReadyState(true);
    }

    render() {
      return (
        <LottieView style={styles.animation} loop autoPlay source={animation} />
      );
    }
  },
);

const styles = StyleSheet.create({
  animation: {
    width: rem(300),
    height: rem(300),
  },
});
