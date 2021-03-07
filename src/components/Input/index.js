import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import shadow from 'src/config/shadow';
import localization, {updateOnLanguageChange} from 'locales';
import {
  elementWidth,
  elementHeight,
  borderRadius,
  offset,
  elementFontSize,
} from 'src/config/sizes';
import colors from 'src/config/colors';

export default updateOnLanguageChange(
  class Input extends React.PureComponent {
    static propTypes = {
      style: PropTypes.any,
      placeholder: PropTypes.string,
      onRef: PropTypes.func,
      editable: PropTypes.bool,
      error: PropTypes.string,
    };

    static defaultProps = {
      style: undefined,
      placeholder: '',
      onRef: () => {},
      editable: true,
      error: '',
    };

    render() {
      const {style, placeholder, onRef, editable, error, ...rest} = this.props;

      return (
        <TextInput
          {...rest}
          style={[
            styles.input,
            shadow,
            !editable && styles.disabled,
            error && styles.error,
          ].concat(style)}
          ref={onRef}
          editable={editable}
          placeholder={placeholder ? localization.t(placeholder) : ''}
          allowFontScaling={false}
        />
      );
    }
  },
);

const styles = StyleSheet.create({
  input: {
    width: elementWidth,
    height: elementHeight,
    borderRadius,
    paddingHorizontal: offset,
    paddingVertical: 0,
    backgroundColor: colors.white,
    marginTop: offset,
    fontSize: elementFontSize,
    fontWeight: 'bold',
    color: colors.dark,
    borderWidth: 2,
    borderColor: colors.white,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.6,
  },
  error: {
    borderColor: colors.red,
  },
});
