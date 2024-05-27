import { MdDelete, MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { Specification } from "../../../util"
import requestApi from "../../../helper/api"
import { toast } from "react-toastify"
import { useContext } from "react"
import { categoryContext } from "../../../hook/admin/contexts/categories"

const ItemSpecification = ({specification} :{
    specification: Specification
}) => {
    const { getSpecification } = useContext(categoryContext)
    const deleteSpecification = (id: string) => {
        requestApi(`specification/${id}`, 'DELETE', {})
            .then(()=>{
                getSpecification()
                toast.success('Xóa thành công')
            }).catch(()=> toast.error('Xóa bị lỗi'))
    }
  return (
    <>
            <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4">{specification.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{specification.value.length}</td>
                <td className="whitespace-nowrap px-6 py-4">
                    <Link to={`/admin/thong-so-ky-thuat/${specification._id}`} className="w-fit px-4 py-2 rounded bg-yellow-500 text-white flex gap-2 items-center">
                        Chỉnh sửa <MdEdit />
                    </Link>
                </td>

                <td className="whitespace-nowrap px-6 py-4">
                    <button onClick={() => {deleteSpecification(specification._id)}} className="px-4 py-2 rounded bg-red-500 text-white flex gap-2 items-center">Xóa <MdDelete /> </button>
                </td>
            </tr>
        </>
  )
}

export default ItemSpecification