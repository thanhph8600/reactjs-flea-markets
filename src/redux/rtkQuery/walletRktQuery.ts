import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, history, wallet } from '../../util'

export const walletSlice = createApi({
    reducerPath: 'walletQuery',
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
        getWallet: builder.query<wallet, void>({
            query: () => 'wallet/customer/auto'
        }),
        getHistoryByIdWallet: builder.query<history[], string>({
            query: idWallet => `/history/${idWallet}`
        }),
    })
})

export const {
    useGetWalletQuery,
    useGetHistoryByIdWalletQuery,
} = walletSlice