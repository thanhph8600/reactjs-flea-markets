import { useContext } from "react"
import { getAddress, SelectDataDistrict, SelectDataWard } from "../../../redux/features/address"
import { useAppSelector } from "../../../redux/hook"
import { formatCurrency, typeOrder } from "../../../util"
import { FaLocationDot } from "react-icons/fa6"
import { infoUserContext } from "../../../hook/admin/contexts"
import { Link } from "react-router-dom"
import requestApi from "../../../helper/api"
import { toast } from "react-toastify"

const ItemComponentOrder = ({ itemOrder, }: {
    itemOrder: typeOrder,
}) => {
    const { infoUser } = useContext(infoUserContext)
    const { id_product, id_buyer, id_seller, status, _id } = itemOrder
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    const cancelOrder = (status: string) => {
        requestApi(`order/${_id}`, 'PATCH', { status })
            .then((data) => {
                if (data.data.status == 400) {
                    toast.error(data.data.message)
                    return
                }
                toast.success('Cập nhật thành công')
            })
    }

    return (
        <div className=" bg-white rounded shadow-md p-4">
            <div className=" flex flex-wrap md:flex-nowrap gap-4">
                <Link to={`/detail-product/${id_product[0]._id}`} className=" flex gap-2 md:w-2/5">
                    <div className=" w-40 h-32">
                        <img className=" w-full h-full object-cover rounded" alt={id_product[0].title} src={id_product[0].thumbnail[0]} />
                    </div>
                    <div className=" flex flex-col gap-3">
                        <h4 className=" font-semibold py-1"> {id_product[0].title} </h4>
                        <p className=" font-semibold text-red-500"> {formatCurrency(id_product[0].price)} </p>
                    </div>
                </Link>
                <div className=" border-l p-2  md:w-2/5 text-sm flex flex-col gap-2">
                    <h4 className=" font-semibold">Thông tin người nhận</h4>
                    <p>Tên: {id_buyer[0].name} </p>
                    <p>Số điện thoại: {id_buyer[0].phone} </p>
                    <p className=" flex gap-1  text-xs text-gray-600">
                        <FaLocationDot />
                        {getAddress(itemOrder.address, district, ward)}
                    </p>
                </div>
                {status != 'cancel_exp' && status != 'delivered' && status != 'successful_delivery'  &&
                    <>
                        {infoUser.sub == id_seller[0]._id ?
                            <div className=" w-1/5 flex flex-col-reverse gap-2">
                                <p onClick={() => cancelOrder('update')} className=" border-[#ff8800] font-semibold border py-1 rounded-md text-center text-[#ff8800] cursor-pointer hover:bg-[#ff8800] hover:text-white">Xác nhận</p>
                                { status != 'delivering' && <p onClick={() => cancelOrder('cancel_exp')} className=" border py-1 rounded-md text-center cursor-pointer hover:bg-gray-600  hover:text-white">Hủy đơn</p>}
                            </div> :
                            <div className=" w-1/5 flex flex-col-reverse">
                                { status != 'delivering' && <p onClick={() => cancelOrder('cancel_exp')} className=" border-[#ff8800] font-semibold border py-1 rounded-md text-center text-[#ff8800] cursor-pointer hover:bg-[#ff8800] hover:text-white">Hủy đơn</p>}
                            </div>
                        }
                    </>}
                {status == 'delivered' && infoUser.sub == id_buyer[0]._id &&
                    <div className=" w-1/5 flex flex-col-reverse">
                        <p onClick={() => cancelOrder('successful_delivery')} className=" border-[#ff8800] font-semibold border py-1 rounded-md text-center text-[#ff8800] cursor-pointer hover:bg-[#ff8800] hover:text-white">Đã nhận được hàng</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default ItemComponentOrder