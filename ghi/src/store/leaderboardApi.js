import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_FAST_API }),
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/users/',
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;