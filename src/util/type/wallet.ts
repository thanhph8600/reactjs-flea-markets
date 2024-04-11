import { defaultValueUser, User } from "./user"

export type wallet = {
    _id: string,
    id_customer: User[],
    current_amount: number,
    sales_tax: number,
}
export const defaultValueWallet: wallet = {
    _id: '',
    id_customer: [defaultValueUser],
    current_amount: 0,
    sales_tax: 0,
}

export type history = {
    _id: string,
    id_wallet: string[],
    transaction: string,
    content: string,
    amount: number,
    current_amount: number,
    created_at: Date,
}

export const defaultValueHistory: history = {
    _id: '',
    id_wallet: [''],
    transaction: '',
    content: '',
    amount: 0,
    current_amount: 0,
    created_at: new Date(),
}