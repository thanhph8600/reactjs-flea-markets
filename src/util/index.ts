export type { Post } from './type/post';
export type { User } from './type/user';
export type { Category, CategoryDetail } from './type/category'
export type { Specification } from './type/specification'
export { defaultValueUser } from './type/user';
export { defaultValueCategory, defaultValueCategoryDetail } from './type/category'
export { defaultValueSpecification } from './type/specification'
export { validePhone, validePassword, convertToSlug } from './validate/validateForm'
export { setToken, getToken, removeToken } from './localStorage/token';