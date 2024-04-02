import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const customerSlice = createApi({
  reducerPath: 'customerQuery',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: builder => ({
    getCustomerByID: builder.query({
      query: (id: string) => `customer/${id}`
    })
  })
})

export const { useGetCustomerByIDQuery } = customerSlice