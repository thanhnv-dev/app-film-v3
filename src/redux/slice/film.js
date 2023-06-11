import {createSlice} from '@reduxjs/toolkit';

export const filmSlice = createSlice({
    name: 'film',
    initialState: {
        data: [],
        dataWithTopics: [],
    },
    reducers: {
        setDataFilm: (state, action) => {
            state.data = action?.payload;
        },
        setDataFilmWithTopics: (state, action) => {
            state.dataWithTopics = action?.payload;
        },
    },
});

export const {setDataFilm, setDataFilmWithTopics} = filmSlice.actions;

export default filmSlice.reducer;
