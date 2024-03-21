import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { categoryContext } from "../../../hook/admin/contexts/categories"
import { defaultValueSpecification } from "../../../util"
import { IoAddCircle } from "react-icons/io5"
import { toast } from "react-toastify"
import requestApi from "../../../helper/api"

const EditSpecification = () => {
    const { id } = useParams()
    const { specification , getSpecification } = useContext(categoryContext)
    const [specificationItem, setSpecificationItem] = useState(defaultValueSpecification)
    const [value, setValue] = useState('')
    useEffect(() => {
        const item = specification.find((item) => item._id === id)
        if (item) {
            setSpecificationItem(item)
        }
    }, [id, specification])
    const validationValue = () => {
        if(!value) {
            toast.warning('Vui lòng nhập giá trị')
            return false
        }
        const check = specificationItem.value.find((item) => item == value)
        if (check) {
            toast.warning('Tên thông số đã tồn tại')
            return false
        }
        return true
    }
    const onSubmmit = () => {
        if (validationValue()) {
            const newValue = [...specificationItem.value, value]
            const newSpecification = {...specificationItem, value: newValue}
            requestApi(`specification/${id}`, 'PATCH', newSpecification)
            .then((res) => {
                if (res.data) {
                    toast.success('Thêm thành công')
                    getSpecification()
                }
            })
            .catch(() => {
                toast.error('Thêm thất bại')
            })
        }
    }
    const delelte = (name: string) => {
        const newValue = specificationItem.value.filter((item) => item !== name)
        const newSpecification = {...specificationItem, value: newValue}
        requestApi(`specification/${id}`, 'PATCH', newSpecification)
        .then((res) => {
            if (res.data) {
                toast.success('Xóa thành công')
                getSpecification()
            }
        })
        .catch(() => {
            toast.error('Xóa thất bại')
        })
    }
    return (
        <>
            <div>
            <div className="border p-4 rounded-md shadow-lg">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <h2 className="text-lg font-semibold pb-2 border-b mb-4">{specificationItem.name}</h2>
                                <label htmlFor="">Thêm dữ liệu</label>
                                <div className="py-2 flex gap-2">
                                    <input onChange={(e)=>setValue(e.target.value)} className="px-2 py-1 font-normal rounded border" type="text" name="value" id="" />
                                    <button onClick={()=> onSubmmit()} className="px-2 py-1 rounded bg-green-500 text-white flex gap-2 items-center hover:bg-green-400">Thêm <IoAddCircle /></button>
                                </div>
                                <div>
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">STT</th>
                                                <th scope="col" className="px-6 py-4">Giá trị</th>
                                                <th scope="col" className="px-6 py-4">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {specificationItem.value.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4">{index + 1}</td>
                                                        <td className="px-6 py-4">{item}</td>
                                                        <td className="px-6 py-4">
                                                            <button onClick={()=>delelte(item)} className="px-2 py-1 rounded bg-red-500 text-white">Xóa</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default EditSpecification