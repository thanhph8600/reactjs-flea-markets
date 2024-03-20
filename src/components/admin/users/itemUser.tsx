import { User } from "../../../util"
import { FaBan } from "react-icons/fa";
const ItemUser = (user: User) => {
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">{user.phone}</td>
            <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
            <td className="whitespace-nowrap px-6 py-4">
                { user.role === 1 && <button className="px-4 py-2 rounded bg-red-500 text-white flex gap-2 items-center">BAN<FaBan /></button> }
            </td>
        </tr>
    )
}
export default ItemUser