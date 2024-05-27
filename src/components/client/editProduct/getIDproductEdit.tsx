import { useParams } from "react-router-dom"
import EditProduct from "./editProduct"

const GetIDproductEdit = () => {
    const { idProduct } = useParams()
  return (
    <>
    {idProduct && <EditProduct idProduct={idProduct} />}
    </>
  )
}

export default GetIDproductEdit