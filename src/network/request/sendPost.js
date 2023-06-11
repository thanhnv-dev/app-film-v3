import AxiosInstance from '../config/AxiosInstance';
import axios from 'axios';

const sendPost = async (endPoint, body) => {
    try {
        let axiosInstance = await AxiosInstance();
        const apiResponse = await axiosInstance.post(
            endPoint,
            JSON.stringify(body),
        );
        return apiResponse;
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            return err.response;
        } else {
            console.log('Network error / Service error');
            return err;
        }
    }
};

export default sendPost;
