import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultValueUser } from "../../util";
import requestApi from "../../helper/api";
import { RootState } from "../store";


export const fetchCustomerByID = createAsyncThunk('customer/fetchCustomerByID', async (id:string) => {
    const response = await requestApi(`customer/${id}`, 'GET', {})
    return response.data
})


const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: defaultValueUser,
        loading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCustomerByID.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCustomerByID.fulfilled, (state, action) => {
                state.loading = false
                state.customer = action.payload
            })
            .addCase(fetchCustomerByID.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectLoadingCustomer = (state:RootState) => state.customer.loading
export const SelectCustomer = (state:RootState) => state.customer.customer
export default customerSlice.reducer