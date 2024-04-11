import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestApi from "../../helper/api";
import { RootState } from "../store";
import { history, wallet } from "../../util";


export const fetchWallet = createAsyncThunk(
    'wallet/fetchWallet',
    async () => {
        const response = await requestApi('wallet/customer/auto', 'GET', {})
        return response.data
    })
export const fetchHistory = createAsyncThunk(
    'wallet/fetchHistory',
    async (idWallet: string) => {
    const response = await requestApi(`history/${idWallet}`, 'GET', {})
    return response.data
})

export const updateWallet = createAsyncThunk(
    'wallet/updateWallet',
    async (payload: { id: string, data: {method: string, amount: number} }) => {
        const { id, data } = payload;
        const response = await requestApi(`wallet/${id}`, 'PATCH', { ...data });
        return response.data;
    }
);

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        wallet: {} as wallet,
        history: [] as history[],
        loading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchWallet.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchWallet.fulfilled, (state, action) => {
                state.loading = false
                state.wallet = action.payload
            })
            .addCase(fetchWallet.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchHistory.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchHistory.fulfilled, (state, action) => {
                state.loading = false
                state.history = action.payload
            })
            .addCase(fetchHistory.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            
            .addCase(updateWallet.pending, (state) => {
                state.loading = true
            })
            .addCase(updateWallet.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateWallet.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectLoadingWallet = (state: RootState) => state.wallet.loading
export const SelectWallet = (state: RootState) => state.wallet.wallet
export const SelectHistory = (state: RootState) => state.wallet.history

export default walletSlice.reducer