import { typeAddressInProduct } from "./address";
import { TypeProduct } from "./product"
import { User } from "./user"

export type typeOrder = {
    _id:string,
    id_seller: User[],
    id_buyer: User[],
    id_product: TypeProduct[],
    price: number,
    address: typeAddressInProduct;
    status: statusOrder;
    created_at: Date;
}

export type typeOrderCreate = {
    id_seller: string,
    id_buyer: string,
    id_product: string,
    price: number,
    address: typeAddressInProduct;
}
export type statusOrder =
    | 'waiting_confirm' 
    | 'processing' 
    | 'delivering' 
    | 'delivered' 
    | 'successful_delivery'
    | 'cancel_exp'