import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import addressReducer  from './features/address'
import productReducer from './features/product';
import customerReducer from './features/customer'
import walletReducer from './features/wallet'
import notificationReducer from './features/notification'
import deliveryAddressReducer from './features/deliveryAddress'
import { customerSlice } from './rtkQuery/customerQuery'
import { productSlice } from './rtkQuery/productQuery'
import { messengerSlice } from './rtkQuery/messenger'
import { walletSlice } from './rtkQuery/walletRktQuery'
import { notificationSlice } from './rtkQuery/notification'
import { deliveryAddressSlice } from './rtkQuery/deliveryAddress'
import { orderSlice } from './rtkQuery/order'

const store = configureStore({
  reducer: {
    address: addressReducer ,
    product: productReducer,
    customer: customerReducer,
    wallet: walletReducer,
    notification: notificationReducer,
    deliveryAddress: deliveryAddressReducer,
    [customerSlice.reducerPath]: customerSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [messengerSlice.reducerPath]: messengerSlice.reducer,
    [walletSlice.reducerPath]: walletSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [deliveryAddressSlice.reducerPath]: deliveryAddressSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
    .concat(customerSlice.middleware)
    .concat(productSlice.middleware)
    .concat(messengerSlice.middleware)
    .concat(walletSlice.middleware)
    .concat(notificationSlice.middleware)
    .concat(deliveryAddressSlice.middleware)
    .concat(orderSlice.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store