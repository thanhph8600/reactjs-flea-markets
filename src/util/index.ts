export type { Post } from './type/post';
export type { User } from './type/user';
export type { Category, CategoryDetail } from './type/category'
export type { Specification } from './type/specification'
export type { province, district, ward, typeValueSelectAddress, typeAddressInProduct } from './type/address'
export type { InterDataFormProduct, TypeProduct, TypeProductUpdate } from './type/product'
export type { RoomChat, Messenger } from './type/messenger'

export { defaultValueUser } from './type/user';
export { defaultValueCategory, defaultValueCategoryDetail } from './type/category'
export { defaultValueSpecification } from './type/specification'
export { defaultValueDistrict, defaultValueProvince, defaultValueWard, defaultValueSelectAddress } from './type/address'
export { defaultValueProduct } from './type/product'

export { setToken, getToken, removeToken } from './localStorage/token';
export { validePhone, validePassword, convertToSlug } from './validate/validateForm'
export { formatCurrency, formatTimeDifference } from './format/format'