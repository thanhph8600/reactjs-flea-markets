import { useEffect, useState } from "react"
import { useGetAllProductQuery } from "../../../../redux/rtkQuery/productQuery"
import SectionListProduct from "./listProduct"
import { TypeProduct, typeValueSelectAddress} from "../../../../util"
import { handleProductByFillterAddress } from "./setProductByCategory"

const SetProductBySearch = ({ valueSearch, fillterAddress, filterPrice }: { 
  valueSearch: string,  filterPrice: { min: number; max: number; }
  fillterAddress : typeValueSelectAddress 
}) => {
  
    const { data: listProduct, isSuccess, isLoading, isFetching } = useGetAllProductQuery()
    const [listShow, setListShow] = useState([] as TypeProduct[])
    
    useEffect(() => {
        if (isSuccess && listProduct) {
            const listData = listProduct.filter((item) => item.title.toLowerCase().includes(valueSearch.toLowerCase()));
            setListShow(handleProductByFillterAddress(listData, fillterAddress, filterPrice))
        }
    }, [fillterAddress, filterPrice, isSuccess, listProduct, valueSearch])
    
  return (
    <>
        {listShow && <SectionListProduct fillterAddress={fillterAddress} products={listShow} isLoading={isLoading} isSuccess={isSuccess} isFetching={isFetching} />}
    </>
  )
}

export default SetProductBySearch