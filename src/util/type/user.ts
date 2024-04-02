export type User = {
    _id: string,
    name: string,
    email: string,
    phone: string,
    role: number,
    avata: string,
}
export const defaultValueUser = {
    _id: '',
    name: '',
    email: '',
    phone: '',
    role: 0,
    avata: ''
}