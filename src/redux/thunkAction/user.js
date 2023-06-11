import {createAsyncThunk} from '@reduxjs/toolkit';
import {sendPost} from 'src/network/request';

const updateUser = createAsyncThunk(
    'user/signUp',
    async (data, {rejectWithValue}) => {
        const res = await sendPost('/users/getdata', {userId: data.userId});
        console.log('res', res);
    },
);

export {updateUser};
