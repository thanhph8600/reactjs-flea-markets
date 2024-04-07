import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, Messenger, RoomChat } from '../../util';

export const messengerSlice = createApi({
  reducerPath: 'messengerQuery',
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
    getListRoomChat: builder.query<RoomChat[], string>({
      query: (idCustomer: string) => `room-chat/customer/${idCustomer}`
    }),
    getListMessengerByIdCustomer:  builder.query<Messenger[], string>({
      query: (idCustomer: string) => `messenger/customer/${idCustomer}`
    }),
  })
})

export const { useGetListRoomChatQuery, useGetListMessengerByIdCustomerQuery } = messengerSlice