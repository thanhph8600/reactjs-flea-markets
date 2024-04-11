import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { deliveryAddress } from "../../util";

type returnCreate= {
    payload:deliveryAddress
}
export const createDeleveryAddress = createAsyncThunk<returnCreate, deliveryAddress>(
    'DeleveryAddress/createDeleveryAddress',
    async (data) => {
        const response = await requestApi(`delivery-address`, 'POST', data);
        return response.data as returnCreate;
    }
);
export const deleteDeleveryAddress = createAsyncThunk<returnCreate, string>(
    'DeleveryAddress/deleteDeleveryAddress',
    async (id: string) => {
        const response = await requestApi(`delivery-address/${id}`, 'DELETE', {});
        return response.data as returnCreate;
    }
);

export const updateDeleveryAddress = createAsyncThunk(
    'DeleveryAddress/updateDeleveryAddress',
    async (payload: { id: string, data: {method: string, amount: number} }) => {
        const { id, data } = payload;
        const response = await requestApi(`deleveryAddress/${id}`, 'PATCH', { ...data });
        return response.data;
    }
);

const DeleveryAddressSlice = createSlice({
    name: 'deleveryAddress',
    initialState: {
        loading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateDeleveryAddress.pending, (state) => {
                state.loading = true
            })
            .addCase(updateDeleveryAddress.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateDeleveryAddress.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectLoadingDeleveryAddress = (state: RootState) => state.deliveryAddress.loading

export default DeleveryAddressSlice.reducer