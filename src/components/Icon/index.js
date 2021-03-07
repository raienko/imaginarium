import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {rem} from 'src/utils/units';
import colors from 'src/config/colors';

const defaultFont = FontAwesome;

export default function Icon({font, ...rest}) {
  const Font = font || defaultFont;
  return <Font {...rest} />;
}

Icon.fonts = {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  Feather,
};

Icon.defaultProps = {
  size: rem(35),
  font: defaultFont,
  color: colors.white,
};
