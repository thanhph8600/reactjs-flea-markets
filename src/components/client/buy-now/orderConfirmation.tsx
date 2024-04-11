import { useParams } from "react-router-dom"
import InfoProductBuyNow from "./infoProductBuyNow"
import ShipBuyNow from "./shipBuyNow"
import PaymentBuyNow from "./paymentBuyNow"
import InfoPaymentBuyNow from "./infoPaymentBuyNow"
import ButtonBuyBow from "./buttonBuyBow"
import DeliveryAddress from "./deliveryAddress/deliveryAddress"
import { useCallback, useState } from "react"
import { deliveryAddress, TypeProductUpdate } from "../../../util"

const OrderConfirmation = () => {
    const { idProduct } = useParams()
    const [deliveryAddress, setDeliveryAddress] = useState({} as deliveryAddress)
    const [product, setProduct] = useState({} as TypeProductUpdate)
    const handleAddress = useCallback((deliveryAddress: deliveryAddress) =>{
        setDeliveryAddress(deliveryAddress)
    },[])
    const handleProduct = useCallback((product:TypeProductUpdate) => {
        setProduct(product)
    },[])
    
    
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

                <PaymentBuyNow />

                <InfoPaymentBuyNow />

                <ButtonBuyBow />
            </div>
        </div>
    )
}

export default OrderConfirmation