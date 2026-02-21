import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Button, Text } from 'react-native';
import { RecordContext, RecordProvider } from './RecordProvider';

jest.mock('@react-native-async-storage/async-storage');

const TestComponent = () => {
  const { record, setRecord, isLoading } = React.useContext(RecordContext);
  return (
    <>
      <Text testID="record-value">{isLoading ? 'loading' : record}</Text>
      <Button
        testID="set-record-button"
        title="Set Record"
        onPress={() => setRecord(2000)}
      />
    </>
  );
};

describe('RecordProvider', () => {
  let component: ReturnType<typeof render>;

  afterEach(() => {
    if (component) {
      component.unmount();
    }
    jest.clearAllMocks();
  });

  test('SHOULD load stored record on mount', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('1500');

    component = render(
      <RecordProvider>
        <TestComponent />
      </RecordProvider>,
    );

    const recordValue = await waitFor(() =>
      component.getByTestId('record-value'),
    );
    expect(recordValue.props.children).toBe(1500);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@record');
  });

  test('SHOULD fallback to 0 WHEN no stored value', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    component = render(
      <RecordProvider>
        <TestComponent />
      </RecordProvider>,
    );

    const recordValue = await waitFor(() =>
      component.getByTestId('record-value'),
    );
    expect(recordValue.props.children).toBe(0);
  });

  test('SHOULD fallback to 0 WHEN stored value is not a valid number', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('invalid');

    component = render(
      <RecordProvider>
        <TestComponent />
      </RecordProvider>,
    );

    const recordValue = await waitFor(() =>
      component.getByTestId('record-value'),
    );
    expect(recordValue.props.children).toBe(0);
  });

  test('SHOULD update record WHEN setRecord is called', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('1000');
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

    component = render(
      <RecordProvider>
        <TestComponent />
      </RecordProvider>,
    );

    await waitFor(() =>
      expect(component.getByTestId('record-value').props.children).toBe(1000),
    );

    fireEvent.press(component.getByTestId('set-record-button'));

    await waitFor(() => {
      expect(component.getByTestId('record-value').props.children).toBe(2000);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('@record', '2000');
    });
  });

  test('SHOULD render null WHILE loading', () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    component = render(
      <RecordProvider>
        <TestComponent />
      </RecordProvider>,
    );

    expect(component.toJSON()).toBeNull();
  });

  test('SHOULD render children AFTER loading finishes', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('999');

    component = render(
      <RecordProvider>
        <TestComponent />
      </RecordProvider>,
    );

    await waitFor(() => {
      expect(component.queryByTestId('record-value')).toBeTruthy();
      expect(component.queryByTestId('set-record-button')).toBeTruthy();
    });
  });
});
