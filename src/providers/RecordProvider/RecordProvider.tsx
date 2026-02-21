import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

interface RecordContextData {
  record: number;
  setRecord: (value: number) => Promise<void>;
  isLoading: boolean;
}

export const RecordContext = createContext<RecordContextData>(
  {} as RecordContextData,
);

export const RecordProvider = ({ children }: any) => {
  const [record, setRecordState] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const value = await AsyncStorage.getItem('@record');
      if (value) {
        const parsed = Number(value);
        setRecordState(Number.isNaN(parsed) ? 0 : parsed);
      } else {
        setRecordState(0);
      }
      setIsLoading(false);
    }
    load();
  }, []);

  const setRecord = async (value: number) => {
    await AsyncStorage.setItem('@record', String(value));
    setRecordState(value);
  };

  if (isLoading) return null;

  return (
    <RecordContext.Provider value={{ record, setRecord, isLoading }}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordProvider;
