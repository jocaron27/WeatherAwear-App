import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeCacheData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.error(e);
    }
}

export const getCacheData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      console.error(e);
    }
}

export const getAllCacheKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys() || [];
    } catch(e) {
      return [];
    }
}

export const clearCacheValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch(e) {
        console.error(e);
    }
}