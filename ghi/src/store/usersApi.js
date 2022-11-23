import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_FAST_API,
  }),
 tagTypes: ['Token'],
 endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/api/users',
      providesTags: ['Token'],
    }),
    createuser: builder.mutation({
      query: data => ({
        url: '/api/users',
        body: data,
        method: 'post',
      }),
      invalidatesTags: ['Token'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
} = usersApi
