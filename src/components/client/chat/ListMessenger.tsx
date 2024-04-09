import { useGetListMessengerByIdCustomerQuery } from "../../../redux/rtkQuery/messenger";
import { useGetCustomerByIDQuery } from "../../../redux/rtkQuery/customerQuery";
import { useEffect, useRef, useState } from "react";
import requestApi from "../../../helper/api";
import io, { Socket } from 'socket.io-client';
import { Messenger } from "../../../util";
import { User } from "../../../hook/admin/contexts/info";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import ItemMessenger from "./itemMess/itemMessenger";
import InputSendMessenger from "./itemMess/inputSendMessenger";

const ListMessenger = ({ idCustomer, onHandleShowListRoom, infoUser }: {
    idCustomer: string,
    onHandleShowListRoom: () => void
    infoUser: User
}) => {
    const [socket, setSocket] = useState<Socket>()
    const { data: listMess, isLoading, isSuccess, refetch } = useGetListMessengerByIdCustomerQuery(idCustomer)
    const { data: infoCustomer, isLoading: isLoadingCustomer, isSuccess: isSuccessCustomer } = useGetCustomerByIDQuery(idCustomer)
    const [theLastMess, setTheLastMess] = useState({} as Messenger)


    const divRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMess])

    useEffect(()=>{
                refetch()
        console.log('refetch');
    },[refetch, idCustomer])

    useEffect(() => {
        if (listMess && !isLoading && isSuccess) {
            const lastMess = listMess[listMess.length - 1]
            if (lastMess && infoCustomer) {
                setTheLastMess(lastMess)

                if (lastMess.id_customer[0] == infoCustomer._id && lastMess.isWatched != true) {
                    requestApi(`messenger/${lastMess._id}`, 'PATCH', { isWatched: true })
                        .then((data) => {
                            if (socket)
                                socket.emit('messenger', { ...data.data, id_receiver: infoCustomer._id });
                            onHandleShowListRoom()
                        })
                }
            }
        }
    }, [idCustomer, isLoading, isSuccess, listMess, infoCustomer])


    useEffect(() => {
        const newSocket = io('ws://localhost:3000');
        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
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
                if(data.id_receiver == infoUser.sub){
                    onHandleShowListRoom()
                    refetch()
                }
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);

    const sendMess = (value:{messenger:string}|{ thumbnail:string }) => {
        console.log(value);
        
        requestApi(`messenger/${idCustomer}`, 'POST', value ,'application/json',)
            .then((data) => {
                    socket?.emit('messenger', { ...data.data, id_receiver: idCustomer });

                refetchMess();
                onHandleShowListRoom();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const refetchMess = () => {
        refetch()
    }

    return (
        <div className=" flex flex-col h-full">
            {!isLoadingCustomer && isSuccessCustomer && infoCustomer &&
                <div className=" flex gap-2 items-center py-2 border-b px-4">
                    <div className=" w-12 h-12">
                        <img className=" w-full h-full rounded-full object-cover bg-red-200" src={infoCustomer.avata} alt="" />
                    </div>
                    <h4 className=" font-semibold text-base"> {infoCustomer.name} </h4>
                </div>
            }
            <div ref={divRef} className=" p-4 flex-1 overflow-y-auto">
                <div className=" flex flex-col gap-2">
                    {!isLoading && isSuccess && listMess && infoCustomer &&
                        listMess.map((item) => {
                            return (
                                <ItemMessenger key={item._id} messenger={item} infoCustomer={infoCustomer} />
                            )
                        })
                    }
                    <div className="ml-auto text-left">
                        {theLastMess && infoUser &&
                            <>
                                {theLastMess.id_customer == infoUser.sub && <>
                                    {theLastMess.isWatched ?
                                        <div className="w-4 h-4 ">
                                            <img className=" object-cover rounded-full w-full h-full" src={infoCustomer?.avata} alt="" />
                                        </div> :
                                        <div>
                                            <IoCheckmarkDoneOutline />
                                        </div>
                                    }
                                </>}
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className=" border-t p-2">
                <InputSendMessenger onSendMess={sendMess} />
            </div>
        </div>
    )
}

export default ListMessenger