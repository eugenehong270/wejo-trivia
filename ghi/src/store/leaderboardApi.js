import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const gamesApi = createApi({
    reducerPath: 'games',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_FAST_API }),
    endpoints: builder => ({
        getGames: builder.query({
            query: () => '/api/games',
        }),
    }),
});

export const { useGetGamesQuery } = gamesApi;