import { Category, CategoryDetail } from "../../../util"

const DeleteCategory = ({category, onCancelPopup, onDelete}:{
    category:Category | CategoryDetail, 
    onCancelPopup:() => void
    onDelete: (id: string) => void
}) => {
    return(
        <>
            <div className="p-5 rounded-lg bg-white">
                <h2 className=" text-center pb-2 font-semibold">Bạn có chắc muốn xóa danh mục này không</h2>
                <div className="py-4 flex items-center justify-center gap-3">
                    <img className="w-20" src={category.thumbnail} alt="" />
                    <h4 className="font-semibold  text-xl "> {category.name}</h4>
                </div>
                <div className="py-2 flex justify-end gap-5">
                    <button onClick={()=> onCancelPopup()} className="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-500">Hủy</button>
                    <button onClick={()=> onDelete(category._id)} className="px-4 py-2 rounded-md text-sm text-white bg-red-600 hover:bg-red-500">Xóa</button>
                </div>
            </div>
        </>
    )
}
export default DeleteCategory