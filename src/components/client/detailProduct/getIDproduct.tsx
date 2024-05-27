import { useParams } from "react-router-dom"
import DetailProduct from "./detailProduct"

const GetIDproduct = () => {
    const { id } = useParams()
  return (
    <>
    {id && <DetailProduct id={id} />}
    </>
  )
}

export default GetIDproduct