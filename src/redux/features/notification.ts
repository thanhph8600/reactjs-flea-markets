import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification as typeNotification } from "../../util";
import requestApi from "../../helper/api";
import { RootState } from "../store";


export const updateIsNewNotification = createAsyncThunk('notification/updateIsNewNotification', async (id:string) => {
    const response = await requestApi(`notification/customer/${id}`, 'PATCH', {})
    return response.data
})

export const updateIsWatchNotification = createAsyncThunk('notification/updateIsWatchNotification', async (id:string) => {
    const response = await requestApi(`notification/isWatched/${id}`, 'PATCH', { isWatched: true })
    return response.data
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notification: {} as typeNotification,
        loading: false,
        loadingUpdateIsWatch: false,
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateIsNewNotification.pending, (state) => {
                state.loading = true
            })
            .addCase(updateIsNewNotification.fulfilled, (state, action) => {
                state.loading = false
                state.notification = action.payload
            })
            .addCase(updateIsNewNotification.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(updateIsWatchNotification.pending, (state) => {
                state.loading = true
            })
            .addCase(updateIsWatchNotification.fulfilled, (state) => {
                state.loadingUpdateIsWatch = false
            })
            .addCase(updateIsWatchNotification.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})

export const SelectLoadingNotification = (state:RootState) => state.notification.loading
export const SelectNotification = (state:RootState) => state.notification.notification
export const SelectLoadingUpdateIsWatchNotification = (state:RootState) => state.notification.loadingUpdateIsWatch

export default notificationSlice.reducer