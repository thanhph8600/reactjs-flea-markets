import { createSlice } from '@reduxjs/toolkit'
import requestApi from '../../helper/api'
import { RootState } from '../store'
import { defaultValueDistrict, defaultValueWard, province as typeProvince, district as typeDistrict , ward as typeWard} from '../../util'


const province = await requestApi('province', 'GET', {})
const district = await requestApi('district', 'GET', {})
const ward = await requestApi('ward', 'GET', {})

export const addressSlide = createSlice({
  name: 'address',
  initialState: {
    province: province.data,
    district: [defaultValueDistrict],
    ward: [defaultValueWard],
  },
  reducers: {
    setDistrict: (state, action) => {
      const newDistrict = district.data.filter((item :typeDistrict)=> item._province_id === action.payload) 
      state.district = newDistrict
    },
    setWard: (state, action) => {
      const newWard = ward.data.filter((item :typeWard)=> item._district_id === action.payload) 
      state.ward = newWard
    }
  },
})

export const { setDistrict, setWard } = addressSlide.actions

export const getNameProvinceById = (id: string)=> {
  const itemProvince = province.data.find((item:typeProvince)=> item._id == id)
  try {
    return itemProvince._name    
  } catch (error) {
    console.log(error);
    return '';
  }
}
export const getNameDistrictById = (id:string) => {
  const itemDistrict = district.data.find((item:typeDistrict)=> item._id == id)
  if (itemDistrict._name){
    return itemDistrict._name
  }
  return '';
}
export const getNameWardById = (id:string) => {
  const itemWard = ward.data.find((item:typeWard)=> item._id == id)
  if (itemWard._name){
    return itemWard._name
  }
  return ''; 
}

export const  getAddress = (address:{address:string,idProvince:string, idDistrict:string, idWard: string}) => {
    return `${address.address}, ${getNameWardById(address.idWard)}, ${getNameDistrictById(address.idDistrict)}, ${getNameProvinceById(address.idProvince)}`
}

export const SelectProvince = (state:RootState) => state.address.province
export const SelectDistrict = (state:RootState) => state.address.district
export const SelectWard = (state:RootState) => state.address.ward

export default addressSlide.reducer