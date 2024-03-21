import { Category, defaultValueCategory } from "../../../util"
import { MdEdit, MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import Popup from "../popup";
import DeleteCategory from "./deleteCategory";
import { Link } from 'react-router-dom'
const ItemCategory = ({ category, onHandlePopup, setIsEdit, setFormCategory, onDelete }: {
    category: Category,
    onHandlePopup: () => void,
    setIsEdit: Dispatch<SetStateAction<boolean>>,
    setFormCategory: Dispatch<SetStateAction<Category>>
    onDelete: (id: string) => void
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [infoCategory, setInfoCategory] = useState(defaultValueCategory);
    const handleDelete = (category: Category) => {
        setInfoCategory(category);
        handlePopup();
    }
    const handlePopup = () => {
        setShowPopup(!showPopup);
    }
    const cancelPopup = () => {
        setShowPopup(false);
        setInfoCategory(defaultValueCategory);
    }
    return (
        <>
            <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                    <img className=" w-20" src={category.thumbnail} alt="" />
                </td>
                <td className="whitespace-nowrap px-6 py-4">{category.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                    <button onClick={() => {
                        setIsEdit(true);
                        setFormCategory(category);
                        onHandlePopup()
                    }} className="px-4 py-2 rounded bg-yellow-500 text-white flex gap-2 items-center">
                        Chỉnh sửa <MdEdit />
                    </button>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                    <Link to={`/admin/danh-muc-chi-tiet/${category.link}`} className=" w-fit px-4 py-2 rounded bg-blue-500 text-white flex gap-2 items-center">Chi tiết <FaEye /> </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                    <button onClick={() => handleDelete(category)} className="px-4 py-2 rounded bg-red-500 text-white flex gap-2 items-center">Xóa <MdDelete /> </button>
                </td>
            </tr>
            {showPopup &&
                <Popup onHandlePopup={handlePopup}>
                    <DeleteCategory category={infoCategory} onCancelPopup={cancelPopup} onDelete={onDelete} />
                </Popup>}
        </>
    )
}
export default ItemCategory