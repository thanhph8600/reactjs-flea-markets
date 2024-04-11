import { memo, useContext, useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { infoUserContext } from "../../../../hook/admin/contexts"
import { useGetdeliveryAddressByIddeliveryQuery, useGetdeliveryAddressIsDefaultQuery } from "../../../../redux/rtkQuery/deliveryAddress"
import Popup from "../../../admin/popup"
import {  deliveryAddress} from "../../../../util"
import {  useAppSelector } from "../../../../redux/hook"
import { getAddress, SelectDataDistrict, SelectDataWard } from "../../../../redux/features/address"
import ListDeliveryAddress from "./listDeliveryAddress"
import CreateDeliveryAddress from "./createDeliveryAddress"

const DeliveryAddress = memo(function ({onHandleDeliveryAddress}: { onHandleDeliveryAddress: (deliveryAddress: deliveryAddress) => void}) {
    const { infoUser } = useContext(infoUserContext)
    const { data: listdeliveryAddress, isLoading, isSuccess } = useGetdeliveryAddressByIddeliveryQuery(infoUser.sub)
    const {
        data: defaultdeliveryAddress,
        isLoading: isLoadingDefaultAddress,
        isSuccess: isSuccessDefaultAddress,
    } = useGetdeliveryAddressIsDefaultQuery(infoUser.sub)
    const [deliveryAddress, setDeliveryAddress] = useState([] as deliveryAddress[])
    useEffect(() => {
        if (!isLoadingDefaultAddress && isSuccessDefaultAddress && defaultdeliveryAddress){
            setDeliveryAddress(defaultdeliveryAddress)
            onHandleDeliveryAddress(defaultdeliveryAddress[0])
        }
    }, [defaultdeliveryAddress, isLoadingDefaultAddress, isSuccessDefaultAddress])
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    const [showCreateAddress, setShowCreateAddress] = useState(false)
    const handleShowCreateAddress = () => {
        setShowCreateAddress(!showCreateAddress)
    }
    const [showListAddress, setShowListAddress] = useState(false)
    const handleShowListAddress = () => {
        setShowListAddress(!showListAddress)
    }
    const closeAllShow = () => {
        setShowListAddress(!showListAddress)
        setShowCreateAddress(!showCreateAddress)
    }
    const handleDeliveryAddress = (delivery: deliveryAddress) => {
        setDeliveryAddress([delivery])
        setShowListAddress(!showListAddress)
        onHandleDeliveryAddress(delivery)
    }
    console.log('delivery address');
    
    return (
        <div className=" py-2 px-5 border-t">
            <div className=" flex justify-between">
                <h3 className=" flex font-semibold items-center text-base gap-2"><CiLocationOn />Địa chỉ Người nhận</h3>
                {isSuccessDefaultAddress && defaultdeliveryAddress.length != 0 && <p onClick={() => handleShowListAddress()} className=" font-semibold cursor-pointer text-blue-500">Thay đổi</p>}
            </div>
            {!isLoadingDefaultAddress && isSuccessDefaultAddress && deliveryAddress.length != 0 ?
                <div className=" py-2">
                    <p className=" text-sm pb-1"> {deliveryAddress[0].name}  | {deliveryAddress[0].phone}</p>
                    <p className=" text-sm text-gray-500"> {getAddress(deliveryAddress[0].address, district, ward)} </p>
                </div> :
                <div className=" text-sm py-2 flex flex-col gap-2 text-gray-500">
                    <p>Bạn chưa chọn địa chỉ nhận hàng</p>
                    <p onClick={() => handleShowListAddress()} className=" w-fit cursor-pointer px-4 py-1 rounded bg-gray-300 text-gray-700">Chọn địa chỉ nhận hàng</p>
                </div>
            }

            {showListAddress && !isLoading && isSuccess && listdeliveryAddress &&
                <Popup onHandlePopup={handleShowListAddress}>
                    <div className=" w-[500px] ">
                        <ListDeliveryAddress list={listdeliveryAddress} onHandlePopup={handleShowListAddress} onHandlePopupCreateAddress={handleShowCreateAddress} onHandleDeliveryAddress={handleDeliveryAddress} deliveryAddress={deliveryAddress} />
                    </div>
                </Popup>}

            {showCreateAddress && <Popup onHandlePopup={handleShowCreateAddress}>
                <div className=" w-[500px]">
                    <CreateDeliveryAddress onHandlePopup={handleShowCreateAddress} onCloseShow={closeAllShow} />
                </div>
            </Popup>}
        </div>
    )
})




export default DeliveryAddress