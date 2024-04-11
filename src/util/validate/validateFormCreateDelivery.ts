import { deliveryAddress } from "../type/deliveryAddress";

export function checkDataFormCareateDelivery(data:deliveryAddress){
    const error: deliveryAddress = {} as deliveryAddress;
    error.address = {
        address:"",
        idDistrict :"",
        idProvince: "",
        idWard: ""
    }
    error.isDefault = false
    if(data.name == ''){
        error.name = 'Vui lòng điền tên'
        error.isDefault = true
    }else {
        error.name = ''
    }
    if (!data.phone) {
        error.phone =  'Vui lòng nhập số điện thoại';
        error.isDefault = true
    }else if (!/^\d{10}$/.test(data.phone)) {
        error.phone =  'Vui lòng nhập đúng định dạng số điện thoại';
        error.isDefault = true
    }else {
        error.phone = ''
    }
    
    if(!data.address.idWard || !data.address.address){
        error.address.address = 'Vui lòng điền địa chỉ'
        error.isDefault = true
    }else {
        error.address.address = ''
    }
    return error
}