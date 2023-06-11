import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slice/user';
import filmSlice from './slice/film';
const createDebugger = require('redux-flipper').default;

export const store = configureStore({
    reducer: {
        user: userSlice,
        films: filmSlice,
    },
    middleware: getDefaultMiddleware =>
        __DEV__
            ? getDefaultMiddleware({serializableCheck: false}).concat(
                  createDebugger(),
              )
            : getDefaultMiddleware({
                  serializableCheck: false,
              }),
});
