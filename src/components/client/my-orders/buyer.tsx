import { useContext } from "react"
import { useGetPurchaseOrderQuery } from "../../../redux/rtkQuery/order"
import ComponentTopMyOrder from "./componentMyOrder"
import { infoUserContext } from "../../../hook/admin/contexts"

const BuyerComponent = () => {
  const { infoUser } = useContext(infoUserContext)
  const { data: listPurchaseOrder, isLoading, isSuccess } = useGetPurchaseOrderQuery(infoUser.sub)

  return (
    <div>
      {!isLoading && isSuccess && listPurchaseOrder &&<ComponentTopMyOrder name="Đơn mua" listOrder={listPurchaseOrder} />}
    </div>
  )
}

export default BuyerComponent