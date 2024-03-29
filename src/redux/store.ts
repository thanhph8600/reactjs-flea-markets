import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import addressReducer  from './features/address'
import { customerSlice } from './rtkQuery/customer'


const store = configureStore({
  reducer: {
    address: addressReducer ,
    [customerSlice.reducerPath]: customerSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(customerSlice.middleware)
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