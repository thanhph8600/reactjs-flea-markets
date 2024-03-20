import { useContext, useState } from "react";
import { Category } from "../../../util"
import requestApi from "../../../helper/api";
import { categoryContext } from "../../../hook/admin/contexts/categories";
import { toast } from "react-toastify";

const DeleteCategory = ({category, onCancelPopup}:{category:Category, onCancelPopup:() => void}) => {
    const [confirm, setConfirm] = useState(false);
    const { callAPI } = useContext(categoryContext)
    if(confirm) {
        requestApi(`category/${category._id}`, 'DELETE',{}).then(() => {
            toast.success('Xóa danh mục thành công');
            onCancelPopup();
            callAPI();
        }, error => {
            console.log(error);
        })
    }
    return(
        <>
            <div className="p-5 rounded-lg bg-white">
                <h2 className=" text-center pb-2 font-semibold">Bạn có chắc muốn xóa danh mục này không</h2>
                <div className="py-2 flex items-center justify-center gap-3">
                    <img className="w-20" src={category.thumbnail} alt="" />
                    <h4 className="font-semibold  text-base "> {category.name}</h4>
                </div>
                <div className="py-2 flex justify-end gap-5">
                    <button onClick={()=> onCancelPopup()} className="px-3 py-1 rounded-md text-sm text-white bg-green-600 hover:bg-green-500">Hủy</button>
                    <button onClick={()=> setConfirm(true)} className="px-3 py-1 rounded-md text-sm text-white bg-red-600 hover:bg-red-500">Xóa</button>
                </div>
            </div>
        </>
    )
}
export default DeleteCategory