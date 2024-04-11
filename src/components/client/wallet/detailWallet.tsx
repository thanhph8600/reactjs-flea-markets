import { useGetHistoryByIdWalletQuery } from "../../../redux/rtkQuery/walletRktQuery"
import { formatCurrency, wallet } from "../../../util"
import ChartWallet from "./chartWallet"

const DetailWallet = ({wallet}:{wallet:wallet}) => {
    const { current_amount, sales_tax, _id } = wallet
    const { data:histories, isLoading, isSuccess } = useGetHistoryByIdWalletQuery(_id)
    return (
        <>
            <h3 className=" font-semibold text-base">Chi tiết tài khoản</h3>
            <div className=" py-4 flex justify-around">
                <div>
                    <p>Số dư ví:</p>
                    <p className=" py-2 font-semibold text-2xl text-green-600"> {formatCurrency(current_amount)} </p>
                </div>
                <div>
                    <p>Thuế thu nhập:</p>
                    <p className="py-2  font-semibold text-2xl text-red-600"> {formatCurrency(sales_tax)} </p>
                </div>
            </div>
            <div>
                {!isLoading && isSuccess && histories &&
                <ChartWallet history={histories} />}
            </div>
        </>
    )
}

export default DetailWallet