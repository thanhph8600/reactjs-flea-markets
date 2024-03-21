import { useContext, useEffect, useState } from "react"
import { IoAddCircle } from "react-icons/io5"
import { categoryContext } from "../../../hook/admin/contexts/categories"
import ItemSpecification from "./itemSpecification"
import { defaultValueSpecification, Specification } from "../../../util"

const ListSpecification = () => {
    const { specification } = useContext(categoryContext)
    const [listSpecification, setListSpecification] = useState([defaultValueSpecification])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState([] as number[])
    useEffect(() => {
        let listItem = specification
        let lengthPage = Math.ceil(specification.length / 5)
        if (search) {
            listItem = specification.filter((item: Specification) => {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            })
            lengthPage = Math.ceil(listSpecification.length / 5)
        }
        setListSpecification(listItem.slice((page - 1) * 5, page * 5))
        setTotalPage(Array.from({length: lengthPage}, (_, i) => i + 1))
    }, [listSpecification.length, page, search, specification])
    
    return (
        <div>
            <div className="border p-4 rounded-md shadow-lg">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">Tên thông số kỹ thuật</th>
                                            <th scope="col" className="px-6 py-4">Số lượng giá trị</th>
                                            <th scope="col" className="px-6 py-4">
                                                <input onChange={(e)=> setSearch(e.target.value) } className="px-4 py-2 rounded-md border font-normal" type="search" name="" id="" />
                                            </th>
                                            <th scope="col" className="px-6 py-4">
                                                <button onClick={() => { }} className="px-4 py-2 rounded bg-green-500 text-white flex gap-2 items-center">
                                                    Thêm mới
                                                    <IoAddCircle />
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { listSpecification.map((item: Specification, index: number) => {
                                           return  <ItemSpecification key={index} specification={item} /> 
                                        })}
                                    </tbody>
                                </table>
                                <div className="pt-6 flex gap-5 items-center justify-center">
                                    {totalPage.map((item, index) => {
                                        return <p key={index} onClick={() => setPage(item)} className={`px-4 py-2 border rounded-lg cursor-pointer ${page === item ? 'bg-blue-500 text-white' : 'bg-white'}`}>{item}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListSpecification