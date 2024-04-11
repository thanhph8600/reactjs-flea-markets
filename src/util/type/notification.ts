import { TypeProduct } from "./product";
import { User } from "./user";

export type Notification = {
    _id:string,
    id_customer: User[];
    id_product: TypeProduct[];
    content: string,
    created_at: Date,
    isWatched:boolean,
    link:string,
    isNew: boolean,
}