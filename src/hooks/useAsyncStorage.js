import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [loadingStorage, setLoadingStorage] = useState(true);

  useEffect(() => {
    const fetchStoredValue = async () => {
      setLoadingStorage(true);
      try {
        const item = await AsyncStorage.getItem(key);
        console.log(key,item);
        setStoredValue(item ? JSON.parse(item) : initialValue);
        setLoadingStorage(false);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
    fetchStoredValue();
  }, [key, initialValue]);

  const setValue = async (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting data to AsyncStorage:', error);
    }
  };

  const clear = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error clearing data from AsyncStorage:', error);
    }
  };

  return [storedValue, setValue, clear, loadingStorage];
}
