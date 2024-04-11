import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import requestApi from '../../helper/api'
import { RootState } from '../store'
import { defaultValueDistrict, defaultValueWard, province as typeProvince, district as typeDistrict , ward as typeWard} from '../../util'

const province = await requestApi('province', 'GET', {})

export const fetchDistrict = createAsyncThunk('address/fetchDistrict', async () => {
  const response = await requestApi('district', 'GET', {})
  console.log(response);
  return response.data
})
export const fetchWard = createAsyncThunk('address/fetchWard', async () => {
  const response = await requestApi('ward', 'GET', {})
  return response.data
})

export const addressSlide = createSlice({
  name: 'address',
  initialState: {
    province: province.data as typeProvince[],
    dataDistrcit : [defaultValueDistrict],
    dataWard: [defaultValueWard],
    district: [defaultValueDistrict],
    ward: [defaultValueWard],
  },
  reducers: {
    setDistrict: (state, action) => {
      const newDistrict = state.dataDistrcit.filter((item :typeDistrict)=> item._province_id === action.payload) 
      newDistrict ? state.district = newDistrict : state.district = [defaultValueDistrict]
    },
    setWard: (state, action) => {
      const newWard = state.dataWard.filter((item :typeWard)=> item._district_id === action.payload) 
      newWard ? state.ward = newWard : state.ward = [defaultValueWard]
    },
  },
  extraReducers(builder) {
    builder
        .addCase(fetchDistrict.fulfilled, (state, action) => {
            state.dataDistrcit = action.payload
        })
        .addCase(fetchWard.fulfilled, (state, action) => {
          state.dataWard = action.payload
      })
}
})

export const { setDistrict, setWard } = addressSlide.actions

export const getNameProvinceById = (id: string)=> {
  const itemProvince = province.data.find((item:typeProvince)=> item._id == id)
  return itemProvince ? itemProvince._name : '';
}

export const getNameDistrictById = (id: string, districtData: typeDistrict[]) => {
  const itemDistrict = districtData.find((item: typeDistrict) => item._id === id);
  return itemDistrict ? itemDistrict._name : '';
};

export const getNameWardById = (id: string, wardData: typeWard[]) => {
  const itemWard = wardData.find((item: typeWard) => item._id === id);
  return itemWard ? itemWard._name : '';
};

export const getAddress = (address: { address: string, idProvince: string, idDistrict: string, idWard: string }, districtData: typeDistrict[], wardData: typeWard[]) => {
  const provinceName = getNameProvinceById(address.idProvince);
  const districtName = getNameDistrictById(address.idDistrict, districtData);
  const wardName = getNameWardById(address.idWard, wardData);
  return `${address.address}, ${wardName}, ${districtName}, ${provinceName}`;
};

export const SelectProvince = (state:RootState) => state.address.province
export const SelectDistrict = (state:RootState) => state.address.district
export const SelectWard = (state:RootState) => state.address.ward
export const SelectDataDistrict = (state:RootState) => state.address.dataDistrcit
export const SelectDataWard = (state:RootState) => state.address.dataWard
export default addressSlide.reducer