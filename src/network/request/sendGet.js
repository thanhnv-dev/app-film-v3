import AxiosInstance from '../config/AxiosInstance';
import axios from 'axios';

const sendGet = async endPoint => {
    let axiosInstance = await AxiosInstance();

    try {
        const apiResponse = await axiosInstance.get(endPoint);

        return apiResponse;
    } catch {
        err => {
            if (axios.isAxiosError(err) && err.response) {
                return err.response;
            } else {
                console.log('Network error / Service error');
                return err;
            }
        };
    }
};

export default sendGet;
