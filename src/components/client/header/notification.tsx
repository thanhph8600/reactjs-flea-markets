import { IoMdNotificationsOutline } from 'react-icons/io'
import { useGetNofiticationQuery } from '../../../redux/rtkQuery/notification'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatTimeDifference, Notification as typeNotification } from '../../../util'
import io, { Socket } from 'socket.io-client';
import { infoUserContext } from '../../../hook/admin/contexts'
import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { SelectLoadingNotification, updateIsNewNotification, updateIsWatchNotification } from '../../../redux/features/notification'
import { useGetHistoryByIdWalletQuery, useGetWalletQuery } from '../../../redux/rtkQuery/walletRktQuery'
import { useGetPurchaseOrderQuery, useGetSaleOrderQuery } from '../../../redux/rtkQuery/order'
import { socketUrl } from '../../../config'

const Notification = () => {
    const dispatch = useAppDispatch()
    const loadingUpdateNotification = useAppSelector(SelectLoadingNotification)
    const { infoUser } = useContext(infoUserContext)
    const [socket, setSocket] = useState<Socket>()
    const { data: notification, isLoading, isFetching, isSuccess, refetch } = useGetNofiticationQuery(infoUser.sub)
    const [showNotificaton, setShowNotification] = useState(false)
    const [constIsNewNotification, setConstIsNewNotification] = useState(0)
    
    const { refetch: refetchWallet } = useGetWalletQuery(infoUser.sub)
    const { refetch: refetchHistory } = useGetHistoryByIdWalletQuery(infoUser.sub)
    const { refetch: refetchSaleOrder } = useGetSaleOrderQuery(infoUser.sub)
    const { refetch: refetchPurcharseOrder } = useGetPurchaseOrderQuery(infoUser.sub)
    
    const handleShowNotifitaion = () => {
        setShowNotification(!showNotificaton)
    }
    useEffect(() => {
        if (!isLoading && isSuccess && notification && !isFetching) {
                setConstIsNewNotification(notification.filter((item) => item.isNew == true).length)
        }
    }, [isLoading, isSuccess, notification, isFetching, refetch])
    useEffect(()=>{
            dispatch(updateIsNewNotification(infoUser.sub))
    },[showNotificaton, isLoading, dispatch, infoUser.sub])
    useEffect(()=>{
        if(loadingUpdateNotification){
            refetchListNotification()
        }
    },[loadingUpdateNotification, ])
    useEffect(() => {
        const newSocket = io(socketUrl);
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
            socket.on('notification', (data) => {
                console.log(data);
                
                if(data.id_customer[0] == infoUser.sub){
                    refetchListNotification()
                    if(data.link == 'my-orders/seller' || data.link == 'my-orders/buyer' ){
                        refetchSaleOrder()
                        refetchPurcharseOrder()
                    }
                    console.log('refect');
                    
                    if(data.link == '/wallet' || data.link == 'wallet'){
                        console.log('refetch wallet');
                        
                        refetchWallet()
                        refetchHistory()
                    }
                }
            });
            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);
    const refetchListNotification = () => {
        refetch()
    }
    return (
        <>
            <div className='relative '>
                <p onClick={() => handleShowNotifitaion()} className="hover:text-gray-600 cursor-pointer relative">
                    <IoMdNotificationsOutline />
                    {infoUser.sub && constIsNewNotification>0 && <p className=" w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-base absolute -top-2 -right-2"> {constIsNewNotification} </p>}
                </p>
                {showNotificaton && <div className=' absolute z-20 top-11'>
                    <div className='text-black p-2 bg-white w-80 rounded shadow-md border'>
                        <h4 className=' text-base font-semibold px-3 pb-3 pt-1'>Thông báo</h4>
                        <div className=' flex flex-col py-2  max-h-[400px] overflow-y-auto'>
                            {!isLoading && isSuccess && notification &&
                                notification.map(item => {
                                    return <ItemNotification 
                                    key={item._id} 
                                    notification={item} 
                                    handleShowNotifitaion={handleShowNotifitaion} 
                                    />
                                })
                            }
                        </div>
                    </div>
                </div>}
            </div>

        </>
    )
}

const ItemNotification = ({ notification, handleShowNotifitaion }: {
    notification: typeNotification,
    handleShowNotifitaion: () => void
}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onNavigate = () => {
        handleShowNotifitaion()
        dispatch(updateIsWatchNotification(notification._id))
        navigate(`${notification.link}`)
    }

    return (
        <div onClick={() => onNavigate()} className=' cursor-pointer flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md'>
            <div className=' w-10 h-10'>
                <img 
                className=' w-full h-full border rounded-full object-cover' 
                src={notification.id_product ? notification.id_product[0].thumbnail[0] : notification.id_customer[0].avata} 
                alt="" />
            </div>
            <div className=' text-sm'>
                <p className={notification.isWatched == false ? 'font-semibold': ' text-gray-600'}>{notification.content}</p>
                <p className={notification.isWatched == false ? 'text-xs': ' text-gray-600 text-xs'}> {formatTimeDifference(notification.created_at)} </p>
            </div>
            {!notification.isWatched && 
            <div className=' ml-auto'>
            <p className=' h-3 w-3 rounded-full bg-blue-500'></p>
        </div>}
        </div>
    )
}


export default Notification