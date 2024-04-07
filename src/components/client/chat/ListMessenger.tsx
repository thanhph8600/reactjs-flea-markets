import { CiImageOn } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { useGetListMessengerByIdCustomerQuery } from "../../../redux/rtkQuery/messenger";
import { useGetCustomerByIDQuery } from "../../../redux/rtkQuery/customerQuery";
import { useEffect, useRef, useState } from "react";
import requestApi from "../../../helper/api";
import io, { Socket } from 'socket.io-client';
import { Messenger } from "../../../util";
import { User } from "../../../hook/admin/contexts/info";

const ListMessenger = ({ idCustomer, onHandleShowListRoom, infoUser }: { 
    idCustomer: string, 
    onHandleShowListRoom: () => void 
    infoUser: User
}) => {
    const { data: listMess, isLoading, isSuccess, refetch } = useGetListMessengerByIdCustomerQuery(idCustomer)
    const { data: infoCustomer, isLoading: isLoadingCustomer, isSuccess: isSuccessCustomer } = useGetCustomerByIDQuery(idCustomer)
    const [messenger, setMessenger] = useState('')
    const [checkMess, setCheckMess] = useState('')
    const divRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        refetchMess()
        if (divRef.current) {
            divRef.current.scrollTop = divRef.current.scrollHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMess])

    const refetchMess = () => {
        refetch()

    }

    const [socket, setSocket] = useState<Socket>()
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
    const sendMess = () => {
        if (messenger === '') {
            setCheckMess('border-red-500');
            return;
        }
        setCheckMess('');

        requestApi(`messenger/${idCustomer}`, 'POST', { messenger })
            .then((data) => {
                if (socket)
                    socket.emit('messenger', {...data.data, id_receiver: idCustomer});
        
                refetchMess();
                setMessenger('');
                onHandleShowListRoom();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (socket) {
            socket.on('messenger', (data:Messenger) => {
                console.log('Received message from server:', data);
                
                if(data.id_receiver == infoUser.sub){
                    onHandleShowListRoom()
                }
                if(data.id_customer[0] == idCustomer && data.id_receiver == infoUser.sub)
                    refetch()
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);

    const handleMessenger = (value: string) => {
        setMessenger(value)
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
                                <div key={item._id} className={
                                    item.id_customer[0] == infoCustomer._id ?
                                        'bg-gray-100 inline-block max-w-[60%]  mr-auto rounded-md' :
                                        'inline-block max-w-[60%] ml-auto text-left bg-blue-100 rounded-md'
                                }>
                                    <div className=" p-2  text-sm">
                                        <p> {item.messenger}  </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className=" border-t p-2">
                <div className=" flex gap-4 items-center px-3">
                    <div className=" text-2xl cursor-pointer"><CiImageOn /></div>
                    <input
                        onChange={(e) =>
                            handleMessenger(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                sendMess();
                            }
                        }}
                        value={messenger}
                        type="text"
                        className={` w-full text-sm border rounded-md px-2 py-1 outline-none  ${checkMess}`}
                    />
                    <div onClick={() => sendMess()} className={` hover:text-gray-600 text-2xl cursor-pointer`}><IoIosSend /></div>
                </div>
            </div>
        </div>
    )
}

export default ListMessenger