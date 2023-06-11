import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async value => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (e) {
        // saving error
    }
};
const storeRefreshToken = async value => {
    try {
        await AsyncStorage.setItem('refreshToken', value);
    } catch (e) {
        // saving error
    }
};

const storeId = async value => {
    try {
        await AsyncStorage.setItem('id', value);
    } catch (e) {
        // saving error
    }
};

const getId = async () => {
    try {
        const value = await AsyncStorage.getItem('id');
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
};
const getRefreshToken = async () => {
    try {
        const value = await AsyncStorage.getItem('refreshToken');
        if (value !== null) {
            return value;
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
};
const getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return value;
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
};

export {
    storeToken,
    storeRefreshToken,
    storeId,
    getId,
    getToken,
    getRefreshToken,
};
