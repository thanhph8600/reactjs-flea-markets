import { FaList } from "react-icons/fa"
import { IoGrid } from "react-icons/io5"
import ItemProductGrid, { ItemProductGridLoading } from "./itemProductGrid"
import { useState } from "react"
import ItemProductCol, { ItemProductColLoading } from "./itemProductCol"
import { useGetProductByIdCategoryQuery } from "../../../../redux/rtkQuery/productQuery"

const SectionListProduct = ({ idCate }: { idCate: string }) => {
    const [showListGrid, setShowListGrid] = useState(true)
    const { data: products, isLoading, isSuccess, isFetching } = useGetProductByIdCategoryQuery(idCate)
    
    return (
        <div className="bg-white shadow-sm rounded-sm ">
            <div className="p-2 border-b border-gray-100">
                <div className="flex justify-between border-b pb-2">
                    <div></div>
                    <div className="flex gap-2 items-center px-2">
                        <p className=" text-sm rounded-xl px-4 py-2 border border-[#ff8800] text-[#ff8800]">Tin mới trước</p>
                        <div>
                            {showListGrid ?
                                <p
                                    className=" cursor-pointer hover:text-gray-700 text-xl"
                                    onClick={() => setShowListGrid(!showListGrid)}>
                                    <FaList />
                                </p> :
                                <p
                                    className=" cursor-pointer hover:text-gray-700 text-xl"
                                    onClick={() => setShowListGrid(!showListGrid)}>
                                    <IoGrid />
                                </p>
                            }
                        </div>
                    </div>
                </div>
                {showListGrid ?
                    <div className="grid grid-cols-3">
                        {isLoading || isFetching ? 
                            <ItemProductGridLoading length={3} />
                            :
                            isSuccess && products.map((item) => {
                                return <ItemProductGrid key={item._id} itemProduct={item} />
                            })
                        }
                    </div> :
                    <div className="">
                        {isLoading || isFetching ? 
                            <ItemProductColLoading  length={5}/> :
                            isSuccess && products.map((item) => {
                            return <ItemProductCol key={item._id} itemProduct={item} />
                        })
                        }
                    </div>
                }

            </div>
        </div>

    )
}

export default SectionListProduct