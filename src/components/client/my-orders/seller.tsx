import { useContext } from "react";
import ComponentTopMyOrder from "./componentMyOrder"
import { infoUserContext } from "../../../hook/admin/contexts";
import { useGetSaleOrderQuery } from "../../../redux/rtkQuery/order";

const SellerComponent = () => {
  const { infoUser } = useContext(infoUserContext)
  const { data: listSaleOrder, isLoading, isSuccess } = useGetSaleOrderQuery(infoUser.sub)

  return (
    <div>
      {!isLoading && isSuccess && listSaleOrder && <ComponentTopMyOrder name="Đơn bán"  listOrder={listSaleOrder} />}
    </div>
  )
}

export default SellerComponent