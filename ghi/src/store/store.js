import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userSlice } from './userSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userSlice.name]: userSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware),
})

setupListeners(store.dispatch)
