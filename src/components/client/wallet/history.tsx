import { useEffect, useState } from "react"
import { useGetHistoryByIdWalletQuery } from "../../../redux/rtkQuery/walletRktQuery"
import { formatCurrency, formatTime, history } from "../../../util"
import Popup from "../../admin/popup"

const HistoryWallet = ({ idWallet }: { idWallet: string }) => {
    const { data: histories, isLoading, isSuccess } = useGetHistoryByIdWalletQuery(idWallet)
    const [listHistories, setListHistories] = useState([] as history[])
    const [showFullHistoris, setShowFullHistoris] = useState(false)
    useEffect(()=>{
        if(histories && isSuccess){
            setListHistories(histories.slice(0,5))
        }
    },[histories, isSuccess])
    const handleShowFull = () =>{
        setShowFullHistoris(!showFullHistoris)
    }
    return (
        <>
            <div className="flex justify-between items-center pb-4">
                <h3 className=" font-semibold text-base">Lịch sử giao dịch</h3>
                { !isLoading && isSuccess && listHistories && histories.length > 5 &&
                <p onClick={()=>handleShowFull()} className=" cursor-pointer text-blue-500 text-sm">Xem tất cả</p>}
            </div>
            <div className=" flex flex-col">
                { !isLoading && isSuccess && listHistories &&
                    listHistories.map((item)=>{
                       return <ItemHistoryWallet key={item._id} history={item} />
                    })
                }
            </div>
            { showFullHistoris &&
                <Popup onHandlePopup={handleShowFull}> 
                    <div className=" w-[500px] bg-white rounded shadow-md p-2">
                        <h4 className=" font-semibold text-lg text-center py-4">Lịch sử giao dịch</h4>
                        <div className=" overflow-y-auto h-[450px] px-6">
                            <div className=" flex flex-col">
                            { !isLoading && isSuccess && histories &&
                                    histories.map((item)=>{
                                    return <ItemHistoryWallet key={item._id} history={item} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Popup>
            }
        </>
    )
}

export const ItemHistoryWallet = ({history}:{history: history}) => {
    const classTransaction = history.transaction == 'Nạp tiền' ? 'text-green-600' : 'text-red-600' ; 
   return ( <div className=" flex justify-between border-y py-2 items-center ">
        <div className=" flex flex-col gap-1 w-2/3">
            <p className={`font-semibold ${classTransaction}`}> {history.transaction} </p>
            <p className=" font-semibold text-sm"> {history.content} </p>
            <p className=" text-gray-500 text-xs">{formatTime(history.created_at)} </p>
        </div>
        <div className=" w-1/3 text-end">
            <p className={`font-semibold ${classTransaction}`}> 
                { history.transaction == 'Nạp tiền' ? '+ ' : '- '}
                {formatCurrency(history.amount)} 
            </p>
        </div>
    </div>)
}

export default HistoryWallet