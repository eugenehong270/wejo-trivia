import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api'
import { triviaApiSlice } from './triviaApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userSlice } from './userSlice'
import { usersApi } from './leaderboardApi'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [triviaApiSlice.reducerPath]: triviaApiSlice.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(triviaApiSlice.middleware)
            .concat(usersApi.middleware)
})

setupListeners(store.dispatch)
