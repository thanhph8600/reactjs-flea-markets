import { useContext, useState } from "react"
import Popup from "../../admin/popup"
import RechangerWallet from "./rechangerWallet"
import { useGetWalletQuery } from "../../../redux/rtkQuery/walletRktQuery"
import DetailWallet from "./detailWallet"
import HistoryWallet from "./history"
import { infoUserContext } from "../../../hook/admin/contexts"

const Wallet = () => {
    const {infoUser} = useContext(infoUserContext)
    const { data: wallet, isLoading, isSuccess } = useGetWalletQuery(infoUser.sub)

    const [showPopup, setShowPopup] = useState(false)
    const handleShowPopup = () => {
        setShowPopup(!showPopup)
    }
    return (
        <div className=" py-8" >
            <div className=" w-[950px] m-auto">
                { !isLoading && isSuccess && wallet &&
                 <div className=" flex justify-between">
                    <div className="">
                        <p className=" text-gray-500 font-semibold text-base">Xin chào,</p>
                        <h4 className=" py-2 font-semibold text-2xl"> {wallet.id_customer[0].name} </h4>
                    </div>
                    <div className="">
                        <p className=" text-gray-500 font-semibold text-end text-base">Tài khoản định danh</p>
                        <h4 className=" py-2 font-semibold text-xl">  {wallet._id}</h4>
                    </div>
                </div>}
                <div className=" my-4">
                    <div className=" bg-white rounded shadow-lg py-6 px-6">
                        <div className=" flex justify-around items-center">
                            <div onClick={()=> handleShowPopup() } className=" cursor-pointer">
                                <img src="blob:https://web.telegram.org/f275e452-a16b-4cc2-b1ba-c5cf41cd07e9" alt="" />
                                Nạp tiền
                            </div>
                            <div>
                                Chuyển tiền
                            </div>
                            <div>
                                Rút tiền
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" my-4">
                    <div className=" flex gap-2">
                        <div className=" w-2/3 bg-white rounded shadow-md p-4">
                            { !isLoading && isSuccess && wallet && 
                            <DetailWallet wallet={wallet} />}
                        </div>
                        <div className=" w-1/3 bg-white rounded shadow-md p-4">
                            <HistoryWallet idCustomer={infoUser.sub} />
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && <Popup onHandlePopup={handleShowPopup} >
                <RechangerWallet />
            </Popup>}
        </div>
    )
}

export default Wallet