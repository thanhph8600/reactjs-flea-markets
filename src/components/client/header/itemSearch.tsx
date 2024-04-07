import { Link } from "react-router-dom"
import { useGetAllProductQuery } from "../../../redux/rtkQuery/productQuery"
import { useEffect, useState } from "react"
import { TypeProduct} from "../../../util"

const ItemSearch = ({ valueSearch,  onHandleShowSearch }: { valueSearch: string,  onHandleShowSearch: ()=>void }) => {
    const { data: listProduct, isSuccess } = useGetAllProductQuery()
    const [listShow, setListShow] = useState([] as TypeProduct[])
    useEffect(() => {
        if (isSuccess) {
            const listData = listProduct.filter((item) => item.title.toLowerCase().includes(valueSearch.toLowerCase()));
            setListShow(listData.slice(0, 10))
        }
    }, [isSuccess, listProduct, valueSearch])

    return (
        <div className=" search-header absolute top-full left-0 w-full z-30 pt-1">
            <div className=" bg-white max-h-80 shadow-md rounded-md text-sm overflow-y-auto">
                {
                    listShow.map((item) => {
                        return (
                            <Link onClick={()=> onHandleShowSearch()} key={item._id} to={`detail-product/${item._id}`} className=" px-2 hover:bg-gray-100 py-1  border-b flex items-center gap-3">
                                <div className="w-10 h-10">
                                    <img src={item.thumbnail[0]} alt="" className=" object-cover w-full h-full" />
                                </div>
                                <p> {item.title} </p>
                            </Link>)
                    })
                }

            </div>
        </div>
    )
}

export default ItemSearch