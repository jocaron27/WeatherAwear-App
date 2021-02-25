import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

export const storeCacheData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
      Sentry.captureException(error);
    }
}

export const getCacheData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(error) {
      Sentry.captureException(error);
    }
}

export const getAllCacheKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys() || [];
    } catch(error) {
      Sentry.captureException(error);
      return [];
    }
}

export const clearCacheValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch(error) {
      Sentry.captureException(error);
    }
}