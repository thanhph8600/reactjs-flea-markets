import { useContext, useEffect, useState } from "react"
import { IoChatbubblesOutline } from "react-icons/io5"
import { Link } from "react-router-dom"
import { infoUserContext } from "../../../hook/admin/contexts"
import { useGetListRoomChatQuery } from "../../../redux/rtkQuery/messenger"
import io, { Socket } from 'socket.io-client';
import { Messenger } from "../../../util"

const IconChatHeader = () => {
    const [socket, setSocket] = useState<Socket>()
    const { infoUser } = useContext(infoUserContext)
    const { data: listRoomChat, isLoading, isSuccess, refetch } = useGetListRoomChatQuery(infoUser.sub)
    const [countMess, setCountMess] = useState(0)
    useEffect(()=>{
        if(!isLoading && isSuccess && listRoomChat && infoUser){
            const messWatched = listRoomChat.filter((item)=> item.theLastMess.isWatched == false && item.theLastMess.id_customer[0] != infoUser.sub)
            setCountMess(messWatched.length)
        }
    },[infoUser, isLoading, isSuccess, listRoomChat])
    
    useEffect(() => {
        const newSocket = io('ws://localhost:3000');
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);
    useEffect(() => {
        if (socket) {
            socket.on('messenger', (data: Messenger) => {
                if (data.id_receiver == infoUser.sub) {
                    refetch()
                }
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);
    return (
        <Link to={`chat`} className=" relative hover:text-gray-600 cursor-pointer">
            <IoChatbubblesOutline />
            {infoUser.sub && countMess>0 && <p className=" w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-base absolute -top-2 -right-2"> {countMess} </p>}
        </Link>
    )
}

export default IconChatHeader