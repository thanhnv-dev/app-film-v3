import axios from 'axios';
import {BASE_URL} from 'src/constants/const';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from 'src/navigation/RootNavigation';

const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        // clear error
    }
};

const AxiosInstance = async () => {
    const instance = axios.create({
        baseURL: BASE_URL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    instance.interceptors.request.use(
        async config => {
            const token = await AsyncStorage.getItem('token');

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );
    instance.interceptors.response.use(
        async response => {
            return response;
        },
        async error => {
            console.log('====================================');
            console.log('error', error);
            console.log('====================================');
            const originalConfig = error.config;

            if (originalConfig.url !== '/auth/signin' && error.response) {
                if (error.response.status === 401 && !originalConfig._retry) {
                    // originalConfig._retry = true;

                    // try {
                    //     const callRefreshTokenRequest = await refreshToken();

                    //     const newToken = callRefreshTokenRequest.data?.token!;

                    //     await AsyncStorage.setItem('token', newToken);

                    //     return instance(originalConfig);
                    // } catch (_error) {
                    return Promise.reject(error);
                    // }
                }
                if (error.response.status === 403) {
                    clearAll();
                    RootNavigation.navigate('AuthStack');
                }
            }
            return Promise.reject(error);
        },
    );

    return instance;
};
export default AxiosInstance;
