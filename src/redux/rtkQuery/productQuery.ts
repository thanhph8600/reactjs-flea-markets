import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TypeProduct } from '../../util'

export const productSlice = createApi({
  reducerPath: 'productQuery',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: builder => ({
    getAllProduct: builder.query<TypeProduct[], void>({
      query: () => 'product'
    }),
    getProductByID: builder.query({
      query: productId => `/product/${productId}`
    }),
    getProductByIdCategory: builder.query<TypeProduct[], string>({
      query: categoryId => `/product/category/${categoryId}`
    }),
    getProductByIdCategoryDetail: builder.query<TypeProduct[], string>({
      query: categoryDetailId => `/product/category-detail/${categoryDetailId}`
    }),
  })
})

export const { 
  useGetAllProductQuery, 
  useGetProductByIDQuery, 
  useGetProductByIdCategoryQuery, 
  useGetProductByIdCategoryDetailQuery 
} = productSlice