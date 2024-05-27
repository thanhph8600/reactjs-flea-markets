import { useState } from "react"
import ItemProductGrid, { ItemProductGridLoading } from "../listProduct/sectionListProduct/itemProductGrid"
import { TypeProduct } from "../../../util"
import { useGetAllProductQuery } from "../../../redux/rtkQuery/productQuery"

const SectionNewProduct = () => {
    const { data: products,isLoading } = useGetAllProductQuery()
     
    const [show, setShow] = useState(false)
    const [arrShow, setArrShow] = useState([] as TypeProduct[])
    const moreArr = () => {
        if(products)
        setArrShow(products.slice(0, arrShow.length + 10))
        if (products?.length == arrShow.length)
        setShow(!show)
    }
    return (
        <>
            <div className="bg-white p-4 rounded shadow ">
                <h3 className="text-base font-semibold">Tin đăng mới</h3>
                <div className=" grid grid-cols-2 sm:grid-cols-4 py-4 md:grid-cols-5">
                    { !isLoading ? products && products.map((_item, index) => {
                        return <ItemProductGrid key={index} itemProduct={_item}/>
                    }):
                    <ItemProductGridLoading length={10}></ItemProductGridLoading>
                    }
                </div>
                {show && <div className="flex justify-center">
                    <button onClick={() => moreArr()} className=" px-6 bg-red-600 text-white py-2 rounded">Xem thêm</button>
                </div>}
            </div>
        </>
    )
}

export default SectionNewProduct