/**
 * @format
 */
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

import 'react-native';
import React from 'react';
import App from 'src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
