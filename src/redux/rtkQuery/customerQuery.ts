import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../../util'
import { apiUrl } from '../../config'

export const customerSlice = createApi({
  reducerPath: 'customerQuery',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: builder => ({
    getCustomerByID: builder.query<User, string>({
      query: (id: string) => `customer/${id}`
    })
  })
})

export const { useGetCustomerByIDQuery } = customerSlice