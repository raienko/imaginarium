/**
 * @format
 */

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Component from '../index';

it('component renders', () => {
  renderer.create(<Component />);
});
