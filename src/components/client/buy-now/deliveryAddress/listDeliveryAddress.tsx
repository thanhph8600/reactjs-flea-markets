import { useContext } from "react"
import { infoUserContext } from "../../../../hook/admin/contexts"
import { deliveryAddress } from "../../../../util"
import { useGetdeliveryAddressByIddeliveryQuery } from "../../../../redux/rtkQuery/deliveryAddress"
import { useAppDispatch, useAppSelector } from "../../../../redux/hook"
import { getAddress, SelectDataDistrict, SelectDataWard } from "../../../../redux/features/address"
import { deleteDeleveryAddress } from "../../../../redux/features/deliveryAddress"
import { IoClose } from "react-icons/io5"
import { MdDelete } from "react-icons/md"

const ListDeliveryAddress = ({ list, onHandlePopup, onHandlePopupCreateAddress, onHandleDeliveryAddress, deliveryAddress }: {
    list: deliveryAddress[]
    onHandlePopup: () => void
    onHandlePopupCreateAddress: () => void
    onHandleDeliveryAddress: (delivery: deliveryAddress) => void
    deliveryAddress: deliveryAddress[] | undefined
}) => {
    const {infoUser} = useContext(infoUserContext)
    const { refetch } = useGetdeliveryAddressByIddeliveryQuery(infoUser.sub)
    const dispatch = useAppDispatch()
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    const deleteDelivery = (item: deliveryAddress) => {
        dispatch(deleteDeleveryAddress(item._id))
            .then(()=>{
                refetch()
            })
    }
    console.log(deliveryAddress);
    
    return (
        <div className=" bg-white p-4 px-8 relative rounded h-[600px]">
            <p onClick={() => onHandlePopup()} className=" absolute top-3 right-2 text-2xl cursor-pointer"><IoClose /></p>
            <p className=" py-4 font-semibold text-center text-base">Địa chỉ nhận hàng</p>
            <div className=" max-h-[400px] overflow-y-auto py-2 pb-4 flex flex-col gap-2">
                { list.length > 0 && list.map((item, index) => {
                    return (
                        <div key={index} className="">
                            <div className=" w-full cursor-pointer p-2 px-4 border rounded border-[#ff8800] text-sm  flex gap-2 items-center justify-between">
                                <div onClick={() => onHandleDeliveryAddress(item)} className=" flex gap-3 items-center">
                                    <div>
                                        { deliveryAddress ? deliveryAddress.length > 0 && deliveryAddress[0]._id == item._id ?
                                            <p className="w-4 h-4 rounded-full border border-[#ff8800] relative after:absolute after:content-[''] after:w-3 after:h-3 after:rounded-full after:bg-[#ff8800] after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></p> :
                                            <p className="w-4 h-4 rounded-full border border-gray-600 relative after:absolute after:content-[''] after:w-3 after:h-3 after:rounded-full after:bg-gray-600 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></p>
                                        : 
                                        <p className="w-4 h-4 rounded-full border border-gray-600 relative after:absolute after:content-[''] after:w-3 after:h-3 after:rounded-full after:bg-gray-600 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></p> }
                                        
                                    </div>
                                    <div>
                                        <p className=" font-semibold text-base "> {item.name} 
                                            {item.isDefault && <span className=" text-sm pl-2 font-normal text-[#ff8800]"> - Địa chỉ mặc định</span>} 
                                        </p>
                                        <p> {item.phone} </p>
                                        <p> {getAddress(item.address, district, ward)} </p>
                                    </div>
                                </div>
                                <div onClick={() => deleteDelivery(item)} className=" text-xl text-gray-600 hover:text-[#ff8800] cursor-pointer">
                                    <MdDelete />
                                </div>
                            </div>
                        </div>)
                })}
            </div>
            <div className=" h-[350px] overflow-y-auto ">
                <div onClick={() => onHandlePopupCreateAddress()} className="py-4 border border-[#ff8800] text-center text-[#ff8800] text-sm cursor-pointer rounded">
                    <p>Thêm địa chỉ mới</p>
                </div>
            </div>
        </div>
    )
}

export default ListDeliveryAddress