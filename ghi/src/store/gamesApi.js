import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const gamesApi = createApi({
  reducerPath: 'games',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEJO,
  }),
 tagTypes: ['GameList'],
 endpoints: builder => ({
    getGamess: builder.query({
      query: () => '/api/games',
      providesTags: ['GameList'],
    }),
    creategame: builder.mutation({
      query: data => ({
        url: '/api/games',
        body: data,
        method: 'post',
      }),
      invalidatesTags: ['GameList'],
    }),
  }),
})

export const {
  useGetGamesQuery,
  useCreateGameMutation,
} = gamesApi
