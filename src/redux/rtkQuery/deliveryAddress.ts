import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { deliveryAddress, getToken } from '../../util'
import { apiUrl } from '../../config';

export const deliveryAddressSlice = createApi({
  reducerPath: 'deliveryAddressQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
        // Thêm các thông tin header cần thiết vào đây
        const token = getToken('access_token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
}),
  endpoints: builder => ({
    getdeliveryAddressByIddelivery: builder.query<deliveryAddress[], string>({
      query: (id: string) => `delivery-address/customer/${id}`
    }),
    getdeliveryAddressIsDefault: builder.query<deliveryAddress[], string>({
        query: (id: string) => `delivery-address/${id}`
      }),
  })
})

export const { 
    useGetdeliveryAddressByIddeliveryQuery, 
    useGetdeliveryAddressIsDefaultQuery,
 }
 = deliveryAddressSlice