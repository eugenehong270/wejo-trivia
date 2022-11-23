import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.WEJO,
  }),
 tagTypes: ['UserList'],
 endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/api/users',
      providesTags: ['UserList'],
    }),
    createuser: builder.mutation({
      query: data => ({
        url: '/api/users',
        body: data,
        method: 'post',
      }),
      invalidatesTags: ['UserList'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
} = usersApi
