export type { Post } from './type/post';
export type { User } from './type/user';
export type { Category, CategoryDetail } from './type/category'
export type { Specification } from './type/specification'
export type { province, district, ward, typeValueSelectAddress, typeAddressInProduct } from './type/address'
export type { InterDataFormProduct, TypeProduct, TypeProductUpdate } from './type/product'
export type { RoomChat, Messenger } from './type/messenger'
export type { wallet, history } from './type/wallet'
export type { Notification } from './type/notification'
export type { deliveryAddress } from './type/deliveryAddress'
export type { typeOrder, typeOrderCreate, statusOrder } from './type/order'


export { defaultValueUser } from './type/user';
export { defaultValueCategory, defaultValueCategoryDetail } from './type/category'
export { defaultValueSpecification } from './type/specification'
export { defaultValueDistrict, defaultValueProvince, defaultValueWard, defaultValueSelectAddress } from './type/address'
export { defaultValueProduct } from './type/product'
export { defaultValueWallet, defaultValueHistory } from './type/wallet'

export { setToken, getToken, removeToken } from './localStorage/token';
export { validePhone, validePassword, convertToSlug } from './validate/validateForm'
export { formatCurrency, formatTimeDifference, formatTime, listTocpicCheckout, topicCheckout,classLableForm, classInputForm } from './format/format'