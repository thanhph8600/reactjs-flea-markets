import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultValueUser } from "../../util";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { defaultUser } from "../../hook/admin/contexts/info";


export const fetchCustomerByID = createAsyncThunk('customer/fetchCustomerByID', async (id:string) => {
    const response = await requestApi(`customer/${id}`, 'GET', {})
    return response.data
})
export const fetchInfoUser = createAsyncThunk('customer/fetchInfoUser', async () => {
    const response = await requestApi(`auth/profile`, 'GET', {})
    return response.data
})

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        customer: defaultValueUser,
        loading: false,
        infoUser: defaultUser
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
            .addCase(fetchInfoUser.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchInfoUser.fulfilled, (state, action) => {
                state.infoUser = action.payload
                state.loading = false
            })
            .addCase(fetchInfoUser.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectLoadingCustomer = (state:RootState) => state.customer.loading
export const SelectCustomer = (state:RootState) => state.customer.customer
export const SelectInfoUser = (state:RootState) => state.customer.infoUser

export default customerSlice.reducer