import { Link } from "react-router-dom"
import { formatCurrency, wallet } from "../../../util"
import { IoAddOutline } from "react-icons/io5"
import { memo } from "react"

const PaymentBuyNow = memo(function ({ checkWallet, wallet }: { checkWallet: string, wallet: wallet }) {

    return (
        <div className=" bg-white rounded shadow-md pt-2">
            <h4 className=" p-2 px-4 text-base font-semibold"> Phương thức Thanh toán</h4>
            <div className=" p-4 flex justify-between">
                <div className=" flex items-center gap-2">
                    <input type="radio" name="payment" id="payment" checked />
                    <label htmlFor="payment">Thanh toán bằng ví</label>
                </div>
                <div className=" flex flex-col">
                    <div className=" flex flex-row-reverse">
                        <div className="flex items-center px-4 bg-gray-200 py-2 rounded gap-3 ">
                            <p className=" font-semibold text-sm">Số dư: {formatCurrency(wallet.current_amount)} </p>
                            <Link to={`/wallet`} className=" bg-green-600 hover:bg-green-500 p-1 rounded-md text-white font-semibold"><IoAddOutline /></Link>
                        </div>
                    </div>
                    <p className=" text-red-600 text-sm pt-1"> {checkWallet} </p>
                </div>
            </div>
        </div>
    )
})

export default PaymentBuyNow