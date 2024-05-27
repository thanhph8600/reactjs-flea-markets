import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, history, wallet } from '../../util'
import { apiUrl } from '../../config';

export const walletSlice = createApi({
    reducerPath: 'walletQuery',
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
        getWallet: builder.query<wallet, string>({
            query: (id) => `wallet/customer/${id}`
        }),
        getHistoryByIdWallet: builder.query<history[], string>({
            query: idWallet => `history/${idWallet}`
        }),
    })
})

export const {
    useGetWalletQuery,
    useGetHistoryByIdWalletQuery,
} = walletSlice