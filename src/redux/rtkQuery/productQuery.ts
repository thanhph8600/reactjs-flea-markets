import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken, TypeProduct, TypeProductUpdate } from '../../util'
import { apiUrl } from '../../config';

export const productSlice = createApi({
  reducerPath: 'productQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      // Thêm các thông tin header cần thiết vào đây
      const token = getToken('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    getAllProduct: builder.query<TypeProduct[], void>({
      query: () => 'product'
    }),
    getProductByID: builder.query<TypeProductUpdate, string>({
      query: productId => `/product/${productId}`
    }),
    getProductByIdCategory: builder.query<TypeProduct[], string>({
      query: categoryId => `/product/category/${categoryId}`
    }),
    getProductByIdCategoryDetail: builder.query<TypeProduct[], string>({
      query: categoryDetailId => `/product/category-detail/${categoryDetailId}`
    }),
    getProductBySearch: builder.query<TypeProduct[], string>({
      query: search => `/product/search-product/${search}`
    }),
    getProductByCusomter: builder.query<TypeProduct[], string>({
      query: (id) => `/product/customer/${id}`
    }),
  })
})

export const { 
  useGetAllProductQuery, 
  useGetProductByIDQuery, 
  useGetProductByIdCategoryQuery, 
  useGetProductByIdCategoryDetailQuery,
  useGetProductBySearchQuery,
  useGetProductByCusomterQuery
} = productSlice