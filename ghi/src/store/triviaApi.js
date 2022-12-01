import { create } from '@mui/material/styles/createTransitions'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const triviaApiSlice = createApi({
    reducerPath: 'trivia',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://opentdb.com'
    }),
    tagTypes: ['Trivia'],
    endpoints: builder => ({
        getTriviaQuestions: builder.query({
            query: ({ category, difficulty }) => ({
                url: `/api.php?amount=10&category=${category}&difficulty=${difficulty}`
            }),
            providesTags: ['Trivia']
        }),
        getCategories: builder.query({
            query: () => ({
                url: '/api_category.php'
            }),
            providesTags: ['Trivia']
        }),
    })
})

export const {
    useGetTriviaQuestionsQuery,
    useGetCategoriesQuery
} = triviaApiSlice;
