import { MdDelete, MdEdit } from "react-icons/md"
import { Link } from "react-router-dom"
import { Specification } from "../../../util"

const ItemSpecification = ({specification} :{
    specification: Specification
}) => {
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
                    <button onClick={() => {}} className="px-4 py-2 rounded bg-red-500 text-white flex gap-2 items-center">Xóa <MdDelete /> </button>
                </td>
            </tr>
        </>
  )
}

export default ItemSpecification