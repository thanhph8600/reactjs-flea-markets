import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import addressReducer  from './features/address'
import productReducer from './features/product';
import customerReducer from './features/customer'
import { customerSlice } from './rtkQuery/customerQuery'
import { productSlice } from './rtkQuery/productQuery'

const store = configureStore({
  reducer: {
    address: addressReducer ,
    product: productReducer,
    customer: customerReducer,
    [customerSlice.reducerPath]: customerSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
    .concat(customerSlice.middleware)
    .concat(productSlice.middleware)
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