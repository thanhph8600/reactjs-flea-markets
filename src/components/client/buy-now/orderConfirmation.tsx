import { useNavigate, useParams } from "react-router-dom"
import InfoProductBuyNow from "./infoProductBuyNow"
import ShipBuyNow from "./shipBuyNow"
import PaymentBuyNow from "./paymentBuyNow"
import InfoPaymentBuyNow from "./infoPaymentBuyNow"
import ButtonBuyBow from "./buttonBuyBow"
import DeliveryAddress from "./deliveryAddress/deliveryAddress"
import { useCallback, useContext, useEffect, useState } from "react"
import { deliveryAddress, typeOrderCreate, TypeProductUpdate } from "../../../util"
import { useGetWalletQuery } from "../../../redux/rtkQuery/walletRktQuery"
import { infoUserContext } from "../../../hook/admin/contexts"
import { toast } from "react-toastify"
import requestApi from "../../../helper/api"
import { LoaderContex } from "../../../hook/admin/contexts/loader"

const OrderConfirmation = () => {
    const navigate = useNavigate()
    const { setLoader } = useContext(LoaderContex)
    const { idProduct } = useParams()
    const { infoUser } = useContext(infoUserContext)
    const [deliveryAddress, setDeliveryAddress] = useState({} as deliveryAddress)
    const [product, setProduct] = useState({} as TypeProductUpdate)
    const { data:wallet, isLoading, isSuccess } = useGetWalletQuery(infoUser.sub)
    const [checkWallet, setCheckWallet] = useState('')
    const handleAddress = useCallback((deliveryAddress: deliveryAddress) =>{
        setDeliveryAddress(deliveryAddress)
    },[])
    const handleProduct = useCallback((product:TypeProductUpdate) => {
        setProduct(product)
    },[])
    useEffect(()=>{
        if (!isLoading && isSuccess && wallet && product) {
            product.price > wallet.current_amount ? setCheckWallet('Vui lòng nạp thêm tiền để thành toán'): setCheckWallet('')
        }
    },[isLoading, isSuccess, product, wallet])
    const onSubmit = () => {
        if(!deliveryAddress) {
            toast.error('Bạn chưa chọn địa chỉ giao hàng')
            return
        }
        const dataOrder: typeOrderCreate = {
            id_seller: product.id_customer[0]._id,
            id_buyer:infoUser.sub ,
            id_product: product._id,
            price: product.price,
            address: deliveryAddress.address,
        }

        setLoader(true)
        requestApi('order', 'POST', dataOrder)
        .then((data)=>{
            setLoader(false)
            if(data.data.status == 400) {
                toast.error(data.data.message)
                return
            }
            
            toast.success('Cảm ơn bạn đã đặt hàng bên chúng tôi')
            navigate('/my-orders/buyer')
        }).catch(err=>{
            setLoader(false)
            console.log(err);
            if(err.response.data)
            toast.error('Đặt hàng thất bại')
        })
    }
    return (
        <div className=" w-[950px] py-4 m-auto">
            <div className="w-[700px] flex flex-col gap-4">
                <div className=" bg-white rounded shadow-md">
                    <h2 className=" p-2 px-4 text-base font-semibold">Xác nhận đơn hàng</h2>
                    <div className=" p-4 bg-green-100">
                        <p className=" text-sm font-semibold ">Thanh toán đảm bảo khi MUA NGAY</p>
                        <p className="text-xs">Hoàn tiền 100% khi không nhận được hàng</p>
                    </div>
                    <div className=" flex items-center justify-around py-4">
                        <div className=" flex items-center gap-2 flex-col">
                            <img src="https://static.chotot.com/storage/escrow/icons/delivery_received.svg" alt="" />
                            <p className=" font-semibold text-sm">Tiếp nhận</p>
                        </div>
                        <div>
                            <span className="w-12 relative after:absolute after:w-16 after:h-0.5 after:rounded-md after:text-blue-400 after:bg-gray-400  after:top-1/2  after:left-1/2  after:content-['']  after:-translate-x-1/2 after:-translate-y-1/2"></span>
                        </div>
                        <div className=" flex items-center gap-2 flex-col">
                            <img src="https://static.chotot.com/storage/escrow/icons/delivery_accepted.svg" alt="" />
                            <p className=" font-semibold text-sm text-gray-400">Chốt đơn</p>
                        </div>
                        <div>
                            <span className="w-12 relative after:absolute after:w-16 after:h-0.5 after:rounded-md after:text-blue-400 after:bg-gray-400  after:top-1/2  after:left-1/2  after:content-['']  after:-translate-x-1/2 after:-translate-y-1/2"></span>
                        </div>
                        <div className=" flex items-center gap-2 flex-col">
                            <img src="https://static.chotot.com/storage/escrow/icons/delivery_shipping.svg" alt="" />
                            <p className=" font-semibold text-sm text-gray-400">Đang giao</p>
                        </div>
                        <div>
                            <span className="w-12 relative after:absolute after:w-16 after:h-0.5 after:rounded-md after:text-blue-400 after:bg-gray-400  after:top-1/2  after:left-1/2  after:content-['']  after:-translate-x-1/2 after:-translate-y-1/2"></span>
                        </div>
                        <div className=" flex items-center gap-2 flex-col">
                            <img src="https://static.chotot.com/storage/escrow/icons/delivery_done.svg" alt="" />
                            <p className=" font-semibold text-sm  text-gray-400">Hoàn tất</p>
                        </div>
                    </div>
                    <DeliveryAddress onHandleDeliveryAddress={handleAddress} />
                </div>


                {idProduct && <InfoProductBuyNow idProduct={idProduct} onHandleProduct={handleProduct} />}

                <ShipBuyNow />

               {wallet && <PaymentBuyNow checkWallet={checkWallet} wallet={wallet} />}

                { product && <InfoPaymentBuyNow product={product} />}

                { product && wallet && <ButtonBuyBow  handleSubmit={onSubmit} product={product} checkWallet={checkWallet}  />}
            </div>
        </div>
    )
}

export default OrderConfirmation