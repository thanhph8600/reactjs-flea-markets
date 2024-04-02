import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { defaultValueProduct } from "../../util";
import requestApi from "../../helper/api";
import { RootState } from "../store";


export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
    const response = await requestApi('product', 'GET', {})
    return response.data
})
export const fetchProduct = createAsyncThunk('product/fetchProduct', async (id:string) => {
    const response = await requestApi(`product/${id}`, 'GET', {})
    return response.data
})


const productSlice = createSlice({
    name: 'product',
    initialState: {
        listProduct: [defaultValueProduct],
        product: defaultValueProduct,
        loading: false
    },
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.listProduct = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })

            .addCase(fetchProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = true
                console.log(action.error);
            })
    }
})
export const handleImgae = (listImage:string[]) => {
    const thumbnail = listImage.map((item)=> {return `http://localhost:3000/uploads/${item}`} )
     return thumbnail
 }
export const SelectAllProduct = (state:RootState) => state.product.listProduct
export const SelectLoadingProduct = (state: RootState) => state.product.loading
export const SelectProduct = (state:RootState) => state.product.product
export default productSlice.reducer