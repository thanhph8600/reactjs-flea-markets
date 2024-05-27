import { toast } from "react-toastify";
import requestApi from "../../../helper/api";
import { User } from "../../../util"
import { FaBan } from "react-icons/fa";
const ItemUser = (user: User) => {
    const handleBanCustomer = (id: string) => {
        requestApi(`customer/${id}`, 'PATCH', { isBan: true })
        .then(()=>{
            toast.success('Khóa tài khoản thành công')
        }).catch(()=> toast.error('Lỗi cập nhật'))
    }
    const handleUnBanCustomer = (id: string) => {
        requestApi(`customer/${id}`, 'PATCH', { isBan: false })
        .then(()=>{
            toast.success('Khóa tài khoản thành công')
        }).catch(()=> toast.error('Lỗi cập nhật'))
    }
    return (
        <tr className={`border-b dark:border-neutral-500 ${user.isBan && 'bg-gray-300'}`}>
            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.phone}</td>
            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
            <td className="whitespace-nowrap px-6 py-4">
                { user.role === 1 && !user.isBan && <button onClick={()=>handleBanCustomer(user._id)} className="px-4 py-2 rounded bg-red-500 text-white flex gap-2 items-center">BAN<FaBan /></button> }
                { user.role === 1 && user.isBan && <button onClick={()=>handleUnBanCustomer(user._id)} className="px-4 py-2 rounded bg-green-500 text-white flex gap-2 items-center">unBAN<FaBan /></button> }
            </td>
        </tr>
    )
}
export default ItemUser