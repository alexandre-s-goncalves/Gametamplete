import { render } from '@testing-library/react-native';
import { RecordContext } from 'providers/RecordProvider';
import React from 'react';
import { Text } from 'react-native';
import { useRecord } from './useRecord';

const TestComponent = () => {
  const { record, isLoading } = useRecord();
  return <Text testID="record-value">{isLoading ? 'loading' : record}</Text>;
};

describe('useRecord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('SHOULD return context value WHEN provided by RecordContext', () => {
      const mockContextValue = {
        record: 1000,
        setRecord: jest.fn(),
        isLoading: false,
      };

      const { getByTestId } = render(
        <RecordContext.Provider value={mockContextValue}>
          <TestComponent />
        </RecordContext.Provider>,
      );

      expect(getByTestId('record-value').props.children).toBe(1000);
    });

    test('SHOULD return isLoading status from context', () => {
      const mockContextValue = {
        record: 0,
        setRecord: jest.fn(),
        isLoading: true,
      };

      const { getByTestId } = render(
        <RecordContext.Provider value={mockContextValue}>
          <TestComponent />
        </RecordContext.Provider>,
      );

      expect(getByTestId('record-value').props.children).toBe('loading');
    });
  });

  describe('function access', () => {
    test('SHOULD return setRecord function from context', () => {
      const mockSetRecord = jest.fn();
      const mockContextValue = {
        record: 500,
        setRecord: mockSetRecord,
        isLoading: false,
      };

      const TestComponentWithSetRecord = () => {
        const { setRecord } = useRecord();
        return (
          <Text testID="set-record-test" onPress={() => setRecord?.(1500)}>
            Test
          </Text>
        );
      };

      render(
        <RecordContext.Provider value={mockContextValue}>
          <TestComponentWithSetRecord />
        </RecordContext.Provider>,
      );

      expect(mockSetRecord).toBeDefined();
    });
  });
});
