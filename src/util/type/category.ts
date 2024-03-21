export type Category = {
    _id: string,
    name: string,
    thumbnail: string,
    link: string
}
export type CategoryDetail = {
    _id: string,
    id_category: string,
    name: string,
    thumbnail: string,
    specification: Array<string>,
    link: string
}
export const defaultValueCategory = {
    _id: '',
    name: '',
    thumbnail: '',
    link: ''
}
export const defaultValueCategoryDetail = {
    _id: '',
    id_category: '',
    name: '',
    thumbnail: '',
    specification: [''],
    link: ''
}