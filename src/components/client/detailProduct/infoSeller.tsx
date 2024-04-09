import { IoLogoWechat } from "react-icons/io5"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { infoUserContext } from "../../../hook/admin/contexts"
import { User } from "../../../util"
import requestApi from "../../../helper/api"

const InfoSeller = ({ customer,idProduct }: { customer: User,idProduct: string }) => {
    const navigate = useNavigate()
    const { infoUser } = useContext(infoUserContext)
    const [isCustomer, setIsCustomer] = useState(true)
    useEffect(() => {
        if (infoUser.sub == customer._id) setIsCustomer(false)
    }, [customer._id, infoUser.sub])
    const handleMessWitchSeller = () =>{
        requestApi(`messenger/${customer._id}`,'POST',{ id_product: idProduct })
        navigate(`/chat/${customer._id}`)
    }
    return (
        <>
            <div className="flex gap-2 py-2">
                <div className=" w-20">
                    <img className=" m-auto object-cover w-16 h-16 rounded-full border " src={customer.avata} alt="" />
                </div>
                <div className=" w-full">
                    <div className=" w-full flex justify-between items-center">
                        <div>
                            <p className=" text-sm font-semibold"> {customer.name} </p>
                        </div>
                        <div>
                            <Link to={`/customer/${customer._id}`} className=" px-4 py-1 border rounded-md text-xs">Xem trang</Link>
                        </div>
                    </div>
                    <div className=" flex gap-2 text-sm py-2">
                        <div className="flex gap-1 text-xs">
                            <i className="fa fa-star text-yellow-400" aria-hidden="true"></i>
                            <i className="fa fa-star text-yellow-400" aria-hidden="true"></i>
                            <i className="fa fa-star text-yellow-400" aria-hidden="true"></i>
                            <i className="fa fa-star text-yellow-400" aria-hidden="true"></i>
                            <i className="fa fa-star text-yellow-400" aria-hidden="true"></i>
                        </div>
                        5
                        (11 đánh giá)
                    </div>
                </div>
            </div>

            {isCustomer ?
                <div>
                    <div className=" py-2">
                        <div className=" py-4 px-2 bg-gray-100 rounded-md flex items-center gap-1">
                            <div>
                                <img src="https://static.chotot.com/storage/escrow/icons/buy_protection.svg" alt="" />
                            </div>
                            <div>
                                <p className=" text-sm font-semibold ">Thanh toán đảm bảo khi MUA NGAY</p>
                                <p className="text-xs">Hoàn tiền khi không nhận được hàng</p>
                            </div>
                        </div>
                    </div>
                    <div className=" py-2">
                        <div className=" flex flex-col gap-2">
                            <div className=" border rounded-md py-2 bg-green-600 hover:bg-green-800 cursor-pointer text-white">
                                <p className=" font-semibold text-sm text-center">Mua ngay</p>
                            </div>
                            <div className=" border rounded-md py-2 ">
                                <p className=" font-semibold text-sm text-center">098824777</p>
                            </div>
                            <div onClick={()=>handleMessWitchSeller()} className=" cursor-pointer px-4 flex justify-between border rounded-md py-2 ">
                                <p className=" text-2xl"><IoLogoWechat /></p>
                                <p className=" font-semibold text-sm text-center"> Chat với người bán </p>
                            </div>
                        </div>
                    </div>
                </div>
                : <>
                    <div className=" py-2">
                        <div className=" flex flex-col gap-2">
                            <Link to={`/my-ads/${idProduct}`}  className=" border rounded-md py-2 bg-green-600 hover:bg-green-800 cursor-pointer text-white text-center font-semibold text-sm">
                                Đã bán/ Ẩn tin 
                            </Link>
                            <Link to={`/cap-nhat-tin/${idProduct}`} className=" w-full text-center font-semibold text-sm  border rounded-md py-2 ">
                            Sửa tin
                            </Link>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default InfoSeller