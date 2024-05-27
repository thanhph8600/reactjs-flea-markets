import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, typeOrder} from '../../util'
import { apiUrl } from '../../config';

export const orderSlice = createApi({
    reducerPath: 'orderQuery',
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
        getSaleOrder: builder.query<typeOrder[], string>({
            query: (id) => `order/seller/${id}`
        }),
        getPurchaseOrder: builder.query<typeOrder[], string>({
            query: (id) => `order/buyer/${id}`
        }),
    })
})

export const {
    useGetSaleOrderQuery,
    useGetPurchaseOrderQuery,
} = orderSlice