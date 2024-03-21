import { MdDelete, MdEdit } from "react-icons/md";
import { CategoryDetail } from "../../../../util"
import DeleteCategory from "../deleteCategory";
import { useState } from "react";
import Popup from "../../popup";

const ItemCategoryDetail = ({ categoryDetail, onHandlePopup, onDelete, } : {
    categoryDetail:CategoryDetail
    onHandlePopup: (categoryDetail?:CategoryDetail) => void;
    onDelete: (id: string) => void;
}) => {
    const [showPopup, setShowPopup] = useState(false);
    const handlePopup = () => {
        setShowPopup(!showPopup);
    }
    return (
        <>
            <tr className="border-b dark:border-neutral-500">
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                    <img className=" w-20 max-h-20" src={categoryDetail.thumbnail} alt="" />
                </td>
                <td className="whitespace-nowrap px-6 py-4">{categoryDetail.name}</td>
                <td className="whitespace-nowrap px-6 py-4">
                    <button onClick={() => {onHandlePopup(categoryDetail)}} className="px-4 py-2 rounded bg-yellow-500 text-white flex gap-2 items-center">
                        Chỉnh sửa <MdEdit />
                    </button>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                    <button onClick={()=> handlePopup() } className="px-4 py-2 rounded bg-red-500 text-white flex gap-2 items-center">Xóa <MdDelete /> </button>
                </td>
            </tr>
            {showPopup &&
                <Popup onHandlePopup={handlePopup}>
                    <DeleteCategory category={categoryDetail} onCancelPopup={handlePopup} onDelete={onDelete} />
                </Popup>}
        </>    
    )
}
export default ItemCategoryDetail