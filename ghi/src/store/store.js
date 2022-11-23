import { configureStore } from '@reduxjs/toolkit'
import { triviaScoreSlice } from './triviaScoreSlice'
import { usersApi } from './usersApi'
import { triviaQuestionsApi } from './triviaQuestionsApi'
import { triviaCategoriesApi } from './triviaCategoriesApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
    reducer: {
        [triviaQuestionsApi.reducerPath]: triviaQuestionsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [triviaCategoriesApi.reducerPath]: triviaCategoriesApi.reducer,
        [triviaQuestionsApi.reducerPath]: triviaQuestionsApi.reducer,
        [triviaScoreSlice.reducerPath]: triviaScoreSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(triviaQuestionsApi.middleware)
            .concat(usersApi.middleware),
})

setupListeners(store.dispatch)
