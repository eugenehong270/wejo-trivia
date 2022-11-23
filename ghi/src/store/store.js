import { configureStore } from '@reduxjs/toolkit'
import { triviaScoreSlice } from './triviaScoreSlice'
import { usersApi } from './usersApi'
import { gamesApi } from './gamesApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
    reducer: {
        [gamesApi.reducerPath]: gamesApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [triviaCategoriesApi.reducerPath]: triviaCategoriesApi.reducer,
        [triviaQuestionsApi.reducerPath]: triviaQuestionsApi.reducer,
        [triviaScoreSlice.reducerPath]: triviaScoreSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(gamesApi.middleware)
            .concat(usersApi.middleware),
})

setupListeners(store.dispatch)
