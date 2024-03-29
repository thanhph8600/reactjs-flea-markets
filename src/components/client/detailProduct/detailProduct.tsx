import { CiLocationOn } from "react-icons/ci";
import { IoLogoWechat } from "react-icons/io5";
import { Link, useParams } from "react-router-dom"

const DetailProduct = () => {
    const { id } = useParams()
    console.log(id);

    return (
        <div className=" w-[950px] m-auto">
            <div className=" bg-white p-6 shadow-md">
                <div className="flex gap-7">
                    <div className=" w-2/3">
                        <div>
                            <div className=" px-10 border">
                                <img className=" m-auto object-contain h-[350px]" src="https://images.autofun.vn/file1/87653b83f38f44518ae12022e7d9ffcf_800.jpg" alt="" />
                            </div>

                            <div className=" py-2 flex flex-col gap-2">
                                <h2 className=" text-lg font-semibold">Siêu xe SH đời mới 2022, màu xanh là cây, trùm đầu</h2>
                                <p className=" text-red-500 font-semibold">1.500.000 đ</p>
                                <p className=" text-sm">Tủ lạnh nhỏ gọn tiết kiệm điện, phù hợp sinh viên phòng trọ.. Anh chị cần lh mình.. Bảo hành 6 thang .. Bao ship TPHCM. Anh chị cần lh mình..</p>
                            </div>

                            <div className=" grid grid-cols-2 gap-4 text-sm py-4">
                                <div>
                                    Tình trạng: Đã sử dụng
                                </div>
                                <div>
                                    Tình trạng: Đã sử dụng
                                </div>
                                <div>
                                    Tình trạng: Đã sử dụng
                                </div>
                                <div>
                                    Tình trạng: Đã sử dụng
                                </div>
                            </div>
                            <div>
                                <h2 className=" font-semibold text-gray-500 py-2 border-b mb-2">Khu vực</h2>
                                <div className=" flex items-center gap-2">
                                    <p className=" text-xl"><CiLocationOn /></p>
                                    <p className=" text-sm">Phường 4, Quận 4, Tp Hồ Chí Minh</p>    
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className=" w-1/3 border-t">
                        <div className="flex gap-2 py-2">
                            <div className=" w-20">
                                <img className=" m-auto object-contain w-16 h-16 rounded-full border " src="https://images.autofun.vn/file1/87653b83f38f44518ae12022e7d9ffcf_800.jpg" alt="" />
                            </div>
                            <div className=" w-full">
                                <div className=" w-full flex justify-between items-center">
                                    <div>
                                        <p className=" text-sm font-semibold">Nguyễn Nam</p>
                                    </div>
                                    <div>
                                        <Link to={'/customer/123'}  className=" px-4 py-1 border rounded-md text-xs">Xem trang</Link>
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
                                <div className=" border rounded-md py-2 cursor-pointer hover:bg-gray-100 text-green-700">
                                    <p className=" font-semibold text-sm text-center">098824777</p>
                                </div>
                                <div className=" px-4 flex justify-between border rounded-md py-2 cursor-pointer hover:bg-gray-100 text-green-700">
                                    <p className=" text-2xl"><IoLogoWechat /></p>
                                    <p className=" font-semibold text-sm text-center"> Chat với người bán </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct