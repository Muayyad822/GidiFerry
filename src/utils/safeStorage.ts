import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Fallback memory storage
const memoryStorage: { [key: string]: string } = {};

export const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(key);
      }
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.warn('SecureStore Error: Falling back to memory', e);
      return memoryStorage[key] || null;
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.setItem(key, value);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.warn('SecureStore Error: Saving to memory only', e);
      memoryStorage[key] = value;
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      delete memoryStorage[key];
    }
  }
};
