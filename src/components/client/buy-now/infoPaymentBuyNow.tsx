import { memo } from "react"
import { formatCurrency, TypeProductUpdate } from "../../../util"

const InfoPaymentBuyNow = memo(function ({product}:{product: TypeProductUpdate}) {
  return (
    <div className=" bg-white rounded shadow-md pt-2">
      <h4 className=" p-2 px-4 text-base font-semibold">Thông tin Thanh toán</h4>
      <div className=" p-4 flex flex-col gap-2 text-sm">
        <div className=" flex justify-between">
          <p>Số tiền:</p>
          <p> {formatCurrency(product.price)} </p>
        </div>
      </div>
      <div className="border-b border-2 border-dotted"></div>
      <div className=" p-4  flex justify-between text-base font-semibold">
          <p>Tổng thanh toán:</p>
          <p> {formatCurrency(product.price)} </p>
        </div>
    </div>
  )
})

export default InfoPaymentBuyNow