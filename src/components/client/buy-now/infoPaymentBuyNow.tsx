import { formatCurrency } from "../../../util"

const InfoPaymentBuyNow = () => {
  return (
    <div className=" bg-white rounded shadow-md pt-2">
      <h4 className=" p-2 px-4 text-base font-semibold">Thông tin Thanh toán</h4>
      <div className=" p-4 flex flex-col gap-2 text-sm">
        <div className=" flex justify-between">
          <p>Số tiền:</p>
          <p> {formatCurrency(20000)} </p>
        </div>
        <div className=" flex justify-between">
          <p>Phí vận chuyển:</p>
          <p> {formatCurrency(20000)} </p>
        </div>
      </div>
      <div className="border-b border-2 border-dotted"></div>
      <div className=" p-4  flex justify-between text-base font-semibold">
          <p>Tổng thanh toán:</p>
          <p> {formatCurrency(20000)} </p>
        </div>
    </div>
  )
}

export default InfoPaymentBuyNow