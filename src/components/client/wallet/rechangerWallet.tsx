import { Link } from "react-router-dom"
import { formatCurrency, listTocpicCheckout, topicCheckout } from "../../../util"

const RechangerWallet = () => {
    return (
        <div>
            <div className=" bg-white p-4 rounded shadow-lg w-[500px]">
                <p className=" text-center py-2 font-semibold text-base">Gói nạp cơ bản</p>
                <div className=" flex flex-col gap-2 max-h-[400px] overflow-auto">
                    <div className=" border rounded p-4 cursor-pointer">
                        <p className=" text-sm font-semibold">Giá trị linh hoạt</p>
                        <p className=" text-gray-500 text-xs">Nạp qua quét mã chuyển khoản</p>
                    </div>
                    {
                        listTocpicCheckout.map((item, index) => {
                            return (
                                <Link to={`/checkout/${item}`} key={index} className=" border rounded p-4 cursor-pointer flex justify-between items-center">
                                    <p className=" text-sm font-semibold"> {formatCurrency(topicCheckout(item))} </p>
                                    <p className=" text-xs px-2 py-1 rounded bg-green-600 text-white">Giá: {formatCurrency(topicCheckout(item))}</p>
                                </Link>
                            )
                        })
                    }


                </div>
            </div>
        </div>
    )
}

export default RechangerWallet