import { Link } from "react-router-dom";
import { getAddress, SelectDataDistrict, SelectDataWard } from "../../../redux/features/address"
import { useAppSelector } from "../../../redux/hook"
import { formatCurrency, TypeProduct } from "../../../util"
import { format } from 'date-fns';
import { useState } from "react";
import Popup from "../../admin/popup";

const ListMyProduct = ({ product, onHandleStatusProduct }: {
    product: TypeProduct
    onHandleStatusProduct: (id: string, status: string) => void
}) => {
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    const [showPopup, setShowPopup] = useState(false)
    const handleShowPopup = () => {
        setShowPopup(!showPopup)
    }
    return (
        <div className="bg-white rounded shadow-md">
            <div className=" flex gap-2">
                <div className=" w-2/3">
                    <div className=" flex gap-4 p-4">
                        <Link to={`/detail-product/${product._id}`} className=" w-[140px] h-[160px]">
                            <img className=" w-full h-full object-cover rounded-md" src={product.thumbnail[0]} alt="" />
                        </Link>
                        <div className=" w-full ">
                            <div className=" text-sm flex flex-col gap-2">
                                <Link to={`/detail-product/${product._id}`} className=" font-semibold"> {product.title} </Link>
                                <p className=" font-semibold text-red-500">{formatCurrency(product.price)}</p>
                                <p className=" text-xs text-gray-500"> {getAddress(product.address, district, ward)} </p>
                                <p className=" text-xs text-gray-500">
                                    Ngày đăng tin:
                                    <span className=" text-black"> {format(product.created_at, 'dd/MM/yyyy')} </span>
                                </p>
                                <p className=" text-xs text-gray-500">
                                    Ngày hết hạn:
                                    <span className=" text-black"> {product.end_at && format(product.end_at, ' h:i:s dd/MM/yyyy')}</span>
                                </p>
                                <div className=" ml-auto font-semibold text-sm flex gap-2">
                                    {product.status == 'expired' &&
                                        <p onClick={() => onHandleStatusProduct(product._id, 'extend')} className=" cursor-pointer px-2 py-1 border rounded-md">Gia hạn tin</p>
                                    }
                                    {product.status == 'complete' &&
                                        <Link to={`/cap-nhat-tin/${product._id}`} className=" px-2 py-1 border rounded-md" >Sửa tin</Link>
                                    }
                                    {product.status == 'complete' &&
                                        <p onClick={() => onHandleStatusProduct(product._id, 'hidden')} className=" cursor-pointer px-2 py-1 border rounded-md">Đã bán/ẩn tin</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-1/3 border-l-2">
                    <div className=" p-4 ">
                        <div className=" flex flex-col gap-0.5">
                            <div className=" rounded-t-md overflow-hidden flex gap-0.5">
                                <div className=" w-1/3 bg-gray-100 p-2 flex flex-col items-center justify-center">
                                    <p className=" text-xs text-gray-500">Lượt xem</p>
                                    <p className=" text-xs font-semibold">0</p>
                                </div>
                                <div className=" w-2/3 bg-gray-100 p-2 flex flex-col items-center justify-center">
                                    <p className=" text-xs text-gray-500">Trang .....</p>
                                </div>
                            </div>
                            <div className=" rounded-b overflow-hidden">
                                <div className=" w-full bg-gray-100 px-2 py-4 flex items-center justify-between">
                                    <div className=" text-xs">
                                        <p>Dịch vụ gần đây</p>
                                        <p>Chưa sử dụng dịch vụ nào</p>
                                    </div>
                                    <div>
                                        <p className=" text-sm font-semibold text-blue-500">Xem chi tiết</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" pt-2">
                            {product.status == 'hidden' &&
                                <p onClick={() => onHandleStatusProduct(product._id, 'complete')} className=" cursor-pointer px-2 py-1 border rounded-md bg-green-600 text-center font-semibold text-white ">Hiện tin lại</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {showPopup &&
                <Popup onHandlePopup={handleShowPopup} >
                    <div className=" bg-white rounded-md overflow-hidden w-[400px]">
                        <div className=" text-sm bg-[#ff8800] py-4 text-center text-white">
                            <p>Ẩn tin {product.title} </p>
                        </div>
                        <div className=" bg-white p-4 flex flex-col gap-2">
                            <p className=" text-sm font-semibold">Vui lòng chọn lý do ẩn tin</p>
                            <div className="flex gap-2">
                                <input type="radio" name="reason" id="i-dont-want-to-sell" />
                                <label htmlFor="i-dont-want-to-sell">Tôi không muốn bán nữa</label>
                            </div>
                            <div className="flex gap-2">
                                <input type="radio" name="reason" id="i-sold" />
                                <label htmlFor="i-sold">Tôi đã bán qua kênh khác</label>
                            </div>
                            <div className="flex gap-2">
                                <input type="radio" name="reason" id="other" />
                                <label htmlFor="other">khác</label>
                            </div>
                        </div>
                    </div>
                </Popup>
            }
        </div>
    )
}

export default ListMyProduct