import { useNavigate, useParams } from "react-router-dom"
import { formatCurrency, topicCheckout, wallet } from "../../../util"
import { useContext, useEffect, useState } from "react"
import { useGetHistoryByIdWalletQuery, useGetWalletQuery } from "../../../redux/rtkQuery/walletRktQuery"
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import { SelectLoadingWallet, updateWallet } from "../../../redux/features/wallet"
import { LoaderContex } from '../../../hook/admin/contexts/loader';
import { infoUserContext } from "../../../hook/admin/contexts"

const CheckoutWallet = () => {
    const { topic } = useParams()
    const [price, setPrice] = useState(0)
    useEffect(() => {
        if (topic) setPrice(topicCheckout(topic))
    }, [topic])

    const navigate = useNavigate()
    const {infoUser} = useContext(infoUserContext)
    const {data:wallet, isLoading, isSuccess, isError, refetch: refetchWall } = useGetWalletQuery(infoUser.sub)
    const onSubmit = () => {
        refetchWall()
        navigate('/wallet')
    }
    useEffect(()=>{
        if(isError)
            refetchWall()
    },[isError, refetchWall])
    
    return (
        <div>
            <div className=" w-[950px] m-auto py-6">
                <div className=" bg-white rounded shadow-md p-4">
                    <h4 className=" py-1 border-b font-semibold text-sm">Thanh toán: </h4>
                    <div className=" w-[500px] m-auto py-4">
                        <p className=" pb-1 font-semibold text-base ">Dịch vụ</p>
                        <div className=" py-2 border-y">
                            <div className=" flex gap-3 w-full">
                                <div className=" w-32 border h-28">
                                    <img className=" w-full h-full object-cover rounded" src="https://cdn.hdbank.com.vn/hdbank-file/news/editor/1pmQA43ND07TBxyc5Jj720230217105555/naptienvaovidientu1_1676606306245.jpg" alt="" />
                                </div>
                                <div className=" w-full flex flex-col h-auto justify-around">
                                    <p className=" text-sm font-semibold">Thanh toán: </p>
                                    <p className=" text-xs">
                                        Nạp tiền vào ví: {formatCurrency(price)}
                                    </p>
                                    <div className=" items-end text-xs flex justify-between ">
                                        <p className=" font-semibold"> Số tiền phải trả</p>
                                        <p className=" text-red-500"> {formatCurrency(price)} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-between py-4 border-b">
                            <p className=" text-sm">Tổng tiền (Bao gồm VAT):</p>
                            <p className=" text-sm font-semibold text-red-500">{formatCurrency(price)}</p>
                        </div>
                        <div className=" py-2">
                            <p className=" font-semibold text-sm">Chọn hình thức thanh toán</p>
                            <div className=" py-2 flex flex-col gap-2">
                                <div className="flex gap-4 border rounded p-2">
                                    <input type="radio" name="payment" id="payment-momo" />
                                    <label htmlFor="payment-momo" className=" text-sm flex items-center flex-col">
                                        Ví Momo
                                        <img className=" w-8" src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" />
                                    </label>
                                </div>
                                <div className="flex gap-2 border rounded p-2">
                                    <input type="radio" name="payment" id="payment-zalo" />
                                    <label htmlFor="payment-zalo" className=" text-sm flex items-center flex-col">
                                        Ví Zalopay
                                        <img className=" w-8" src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="" />
                                    </label>
                                </div>
                                <div className="flex gap-2 border rounded p-4">
                                    <input type="radio" name="payment" id="payment-at" checked />
                                    <label htmlFor="payment-at">Tại điểm giao dịch</label>
                                </div>
                            </div>
                            <div className=" py-2 items-center flex">
                                {!isLoading && isSuccess && wallet && <SubmitCheckout handleSubmit={onSubmit} wallet={wallet} price={price} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const SubmitCheckout = ({handleSubmit, wallet, price}: {handleSubmit:()=>void, wallet: wallet, price: number}) => {
    const dispatch = useAppDispatch()
    const loadPay = useAppSelector(SelectLoadingWallet)
    const {setLoader} = useContext(LoaderContex)
    const { refetch } = useGetHistoryByIdWalletQuery(wallet._id)
    const [isSubmit, setIsSubmit] = useState(false)
    const onSubmit = () =>{
        const payload = {
            id: wallet._id,
            data:{
                method: 'plus',
                amount: price
            }
        }
        setLoader(true)
        dispatch(updateWallet(payload))
        setIsSubmit(true)
    }
    useEffect(()=>{
        if(isSubmit){
            if(!loadPay){
                refetch()
                handleSubmit()
                setLoader(false)
            }
        }
    },[handleSubmit, isSubmit, loadPay, refetch, setLoader])
    return (
        <button onClick={() => { onSubmit() }} className=" font-semibold uppercase rounded-md bg-green-600 text-white m-auto px-4 py-2"> {formatCurrency(price)} -  Thanh toán ngay</button>
    )
}

export default CheckoutWallet