import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import '@testing-library/jest-native/extend-expect';

global.__DEV__ = true;

console.info = jest.fn();

jest.mock('expo-constants', () => ({
  manifest: {},
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Interaction/InteractionManager', () => ({
  runAfterInteractions: cb => cb && cb(),
  createInteractionHandle: () => 1,
  clearInteractionHandle: () => {},
}));

jest.mock('@react-navigation/stack', () => {
  const actual = jest.requireActual('@react-navigation/stack');
  return {
    ...actual,
    Card: () => null,
  };
});

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});
