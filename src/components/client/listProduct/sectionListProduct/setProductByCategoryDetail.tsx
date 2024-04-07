import { useEffect, useState } from "react"
import { useGetProductByIdCategoryDetailQuery} from "../../../../redux/rtkQuery/productQuery"
import SectionListProduct from "./listProduct"
import { TypeProduct, typeValueSelectAddress } from "../../../../util"
import { handleProductByFillterAddress } from "./setProductByCategory"

const SetProductByCategoryDetail = ({ idCategoryDetail, fillterAddress, filterPrice }: { 
  idCategoryDetail: string,  filterPrice: { min: number; max: number; }
  fillterAddress : typeValueSelectAddress 
}) => {
    const { data: products, isLoading, isSuccess, isFetching } = useGetProductByIdCategoryDetailQuery(idCategoryDetail)
    const [listProduct, setListProduct] = useState([] as TypeProduct[])
    useEffect(()=>{
      if(isSuccess && products){
        setListProduct(handleProductByFillterAddress(products, fillterAddress, filterPrice))
      }
    },[fillterAddress, filterPrice, isSuccess, products])
  return (
    <>
        {isSuccess && <SectionListProduct fillterAddress={fillterAddress} products={listProduct} isLoading={isLoading} isSuccess={isSuccess} isFetching={isFetching} />}
    </>
  )
}

export default SetProductByCategoryDetail