import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api'
import { triviaApiSlice } from './triviaApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userSlice } from './userSlice'
import { gamesApi } from './leaderboardApi'
import { persistState } from 'redux-devtools-extension'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [triviaApiSlice.reducerPath]: triviaApiSlice.reducer,
        [gamesApi.reducerPath]: gamesApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(triviaApiSlice.middleware)
            .concat(gamesApi.middleware),
    devTools: provess.env.NODE_ENV !== 'production',
    enhancers: [persistState()]
});

setupListeners(store.dispatch)
