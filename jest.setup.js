/* eslint-disable no-undef -- jest is not defined and cannot be */

/**
 * To be able to test components, we need to mock the following dependencies including native code:
 * async-storage
 * react-native-safe-area-context
 * device-info
 * react-native-keyboard-manager
 * reanimated & gesture-handler (https://reactnavigation.org/docs/testing)
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import 'react-native-gesture-handler/jestSetup';

//async-storage
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

//react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn().mockImplementation(({ children }) => children),
    SafeAreaConsumer: jest.fn().mockImplementation(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn().mockImplementation(() => inset),
  };
});

//device-info
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

//invariant violation: new NativeEventEmitter() requires a non-null argument.
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

//react-native-keyboard-manager
jest.mock('./src/base/adapters/KeyboardManagerAdapter.ts', () => jest.fn());

//reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

//silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
