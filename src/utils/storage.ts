import AsyncStorage from '@react-native-async-storage/async-storage';

let key = 'USER_DATA';

const storeUserData = async (userData: any) => {
  try {
    let alteringData = userData;
    if (typeof userData === 'object') {
      alteringData = JSON.stringify(userData);
    }
    await AsyncStorage.setItem(key, alteringData);
  } catch (err) {
    console.log(`Error storing ${key}`, err);
  }
};

const getUserData = async () => {
  try {
    let dataFromStorage = await AsyncStorage.getItem(key);
    let userData = JSON.parse(dataFromStorage as any);
    if (typeof userData === 'object') {
      return userData;
    }
    return dataFromStorage;
  } catch (err) {
    console.log(`Error getting ${key}`, err);
  }
};

const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Token Removed');
  } catch (err) {
    console.log(`Error removing ${key}`, err);
  }
};

export {storeUserData, getUserData, removeUserData};
