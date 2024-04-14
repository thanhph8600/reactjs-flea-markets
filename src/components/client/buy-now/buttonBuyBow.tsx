import { memo } from "react"
import { formatCurrency, TypeProductUpdate} from "../../../util"

const ButtonBuyBow = memo(function ({handleSubmit,product,checkWallet}:{handleSubmit: ()=> void, product: TypeProductUpdate, checkWallet: string}) {
    return (
        <div className=" bg-white rounded shadow-md pt-2">
            <h4 className=" p-2 px-4 text-sm text-center"> 
                Bằng việc bấm  <span className=" font-semibold">Đặt hàng</span> , 
                bạn đã đọc, hiểu rõ và đồng ý  với <span className=" font-semibold">Chính sách mua hàng</span> của chúng tôi.</h4>
            <div className=" p-4 flex justify-between gap-12">
                <div className="">
                    <p className=" text-sm text-gray-600">Tổng cộng:</p>
                    <p className=" pt-1 text-2xl font-bold"> {formatCurrency(product.price)} </p>
                </div>
                <div className=" flex-auto pl-12">
                    {!checkWallet ? 
                    <button onClick={()=> handleSubmit()} className=" w-full border py-2 text-white bg-[#ff8800] font-semibold text-lg rounded shadow uppercase">
                        Đặt hàng
                    </button>:
                    <>
                        <p className=" text-red-600 text-sm text-center pb-1"> {checkWallet} </p>
                        <p className=" text-center w-full border py-2 text-white bg-gray-400 font-semibold text-lg rounded shadow uppercase">
                        Đặt hàng
                    </p>
                    </>
                    }
                </div>
            </div>
        </div>
    )
})

export default ButtonBuyBow