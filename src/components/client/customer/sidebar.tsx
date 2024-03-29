import { useParams } from "react-router-dom"
import { useGetCustomerByIDQuery } from "../../../redux/rtkQuery/customer"
import '../../../assets/slideHome.css'
const SidebarCustomer = () => {
    const { id } = useParams()
    const { data: customer ,isLoading } = useGetCustomerByIDQuery(id)
    
    return (
        <>
            {isLoading ?
    <LoadingCustomer />
:
                <div className=" bg-white border shadow-md rounded-md p-4">
                <div className=" p-2">
                    <img className=" rounded-full object-cover w-20 h-20" src="https://cdn.chotot.com/uac2/26681637" alt="" />
                </div>
                <h4 className=" text-lg font-semibold py-1"> {customer.name} </h4>
                <div className=" text-gray-500  text-sm">
                    <p> Chưa có đánh giá</p>
                    <div className="flex justify-between">
                        <p>Người theo dõi: <span className=" font-semibold">0</span> </p>
                        <p>Đang theo dõi: <span className=" font-semibold">0</span> </p>
                    </div>
                </div>
                <div className=" flex flex-col gap-2 py-2 text-sm">
                    <button className=" cursor-pointer rounded-md bg-[#ff8800] py-1 text-white font-semibold">
                        Chia sẻ trang của bạn
                    </button>
                    <button className=" cursor-pointer rounded-md py-1  font-semibold hover:bg-gray-100 border">
                        Chỉnh sửa trang cá nhân
                    </button>
                </div>
            </div>
            }
        </>
    )
}
const LoadingCustomer = () => {
    return (
        <>
        <div className=" bg-white border shadow-md rounded-md p-4">
                <div className=" p-2">
                    <div className=" rounded-full object-cover w-20 h-20 skeleton" />
                </div>
                <h4 className=" text-lg font-semibold py-3 skeleton"></h4>
                <div className=" text-gray-500  text-sm">
                    <p className=" py-4"></p>
                    <div className="flex justify-between gap-1">
                        <p className=""></p>
                        <p className="skeleton py-2"></p>
                    </div>
                </div>
                <div className=" flex flex-col gap-2 py-2 text-sm">
                    <button className="skeleton py-2">
                    </button>
                    <button className="skeleton py-2">
                    </button>
                </div>
            </div>
        </>
    )
}
export default SidebarCustomer