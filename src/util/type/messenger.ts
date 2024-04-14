import { User } from "./user"

export type RoomChat = {
    _id: string,
    id_customer: User[],
    theLastMess: Messenger,
}

export type Messenger = {
    _id:string,
    isWatched: boolean,
    id_room_chat: string,
    id_receiver:string,
    id_product: string[],
    thumbnail:string,
    id_customer: string[] | string,
    messenger: string,
    created_at: Date,
}