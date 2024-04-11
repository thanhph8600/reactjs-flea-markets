import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, typeOrder} from '../../util'

export const orderSlice = createApi({
    reducerPath: 'orderQuery',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/',
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
        getSaleOrder: builder.query<typeOrder, void>({
            query: () => `order/seller/auto`
        }),
        getPurchaseOrder: builder.query<typeOrder, void>({
            query: () => `order/buyer/auto`
        }),
    })
})

export const {
    useGetSaleOrderQuery,
    useGetPurchaseOrderQuery,
} = orderSlice