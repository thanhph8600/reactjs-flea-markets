// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { district, province, ward } from '../../util'
import { apiUrl } from '../../config'

export const provinceApi = createApi({
    reducerPath: 'provinceApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getDistrictByIdProvince: builder.query<province, null>({
            query: () => `province`,
        }),
    }),
})

export const districtApi = createApi({
    reducerPath: 'districtApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getDistrictByIdProvince: builder.query<district, string>({
            query: (id) => `district/${id}`,
        }),
    }),
})

export const wardApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getWardByIdDictrict: builder.query<ward, string>({
            query: (id) => `ward/${id}`,
        }),
    }),
})


export const { useGetDistrictByIdProvinceQuery } = districtApi
export const { useGetWardByIdDictrictQuery } = wardApi
