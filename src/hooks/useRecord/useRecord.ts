import { RecordContext } from 'providers/RecordProvider';
import { useContext } from 'react';

export const useRecord = () => {
  return useContext(RecordContext);
};
