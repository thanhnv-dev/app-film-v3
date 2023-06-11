import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            state._id = action?.payload._id;
            state.name = action?.payload.name;
            state.email = action?.payload.email;
            state.listLike = action?.payload.listLike;
            state.listPlay = action?.payload.listPlay;
            state.listCmt = action?.payload.listCmt;
            state.listHistory = action?.payload.listHistory;
        },
    },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
