import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken} from '../../util'
import { Notification } from '../../util/type/notification';
import { apiUrl } from '../../config';

export const notificationSlice = createApi({
    reducerPath: 'notificationQuery',
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
        getNofitication: builder.query<Notification[], string>({
            query: (id) => `notification/customer/${id}`
        }),
    })
})

export const {
    useGetNofiticationQuery,
} = notificationSlice