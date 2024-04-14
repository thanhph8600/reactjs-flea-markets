import { useEffect, useState } from "react"
import { statusOrder, typeOrder } from "../../../util"
import ItemComponentOrder from "./itemComponentOrder"

const ComponentMyOrder = ({ name, listOrder}: { 
    name: string, listOrder: typeOrder[] 
}) => {
    const [statusOrder, setStatusOrder] = useState('waiting_confirm' as statusOrder)
    const [newListOrder, setNewListOrder] = useState([] as typeOrder[])
    const handleStatusOrder = (value: statusOrder) => {
        setStatusOrder(value)
    }
    useEffect(()=>{
        const itemStatus = listOrder.filter((item) => {
           return statusOrder != 'delivered' ? 
                    item.status == statusOrder : 
                    item.status == statusOrder || item.status == 'successful_delivery'
        })
        setNewListOrder(itemStatus)
    },[listOrder, statusOrder])
    return (
        <div className=" py-4  w-[950px] m-auto">
            <div className=" w-[750px] ">
                <div className=" bg-white rounded shadow-md">
                    <h3 className=" py-2 px-4 text-xl  uppercase font-semibold border-b">{name}</h3>
                    <div className=" flex justify-between gap-1">
                        <div
                            onClick={() => handleStatusOrder('waiting_confirm')}
                            className={`  p-1 w-full uppercase cursor-pointer 
                            ${statusOrder == 'waiting_confirm' ?
                                    'border-b-4 border-[#ff8800] text-black' :
                                    'text-gray-500'}`}
                        >
                            <p className=" text-xs font-bold text-center py-1">Chờ xác nhận</p>
                        </div>
                        <div
                            onClick={() => handleStatusOrder('processing')}
                            className={`  p-1 w-full uppercase cursor-pointer 
                            ${statusOrder == 'processing' ?
                                    'border-b-4 border-[#ff8800] text-black' :
                                    'text-gray-500'}`}
                        >
                            <p className=" text-xs font-bold text-center py-1">Đang xử lý</p>
                        </div>
                        <div
                            onClick={() => handleStatusOrder('delivering')}
                            className={`  p-1 w-full uppercase cursor-pointer 
                            ${statusOrder == 'delivering' ?
                                    'border-b-4 border-[#ff8800] text-black' :
                                    'text-gray-500'}`}
                        >
                            <p className=" text-xs font-bold text-center py-1">Đang giao</p>
                        </div>
                        <div
                            onClick={() => handleStatusOrder('delivered')}
                            className={`  p-1 w-full uppercase cursor-pointer 
                            ${statusOrder == 'delivered' ?
                                    'border-b-4 border-[#ff8800] text-black' :
                                    'text-gray-500'}`}
                        >
                            <p className=" text-xs font-bold text-center py-1">đã giao</p>
                        </div>
                        <div
                            onClick={() => handleStatusOrder('cancel_exp')}
                            className={`  p-1 w-full uppercase cursor-pointer 
                            ${statusOrder == 'cancel_exp' ?
                                    'border-b-4 border-[#ff8800] text-black' :
                                    'text-gray-500'}`}
                        >
                            <p className=" text-xs font-bold text-center py-1">hoàn tiền/đã hủy</p>
                        </div>
                    </div>
                </div>
                
                <div className=" my-4">
                    <div className=" flex flex-col gap-4">
                        {newListOrder.map((item)=>{
                            return <ItemComponentOrder key={item._id} itemOrder={item} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComponentMyOrder