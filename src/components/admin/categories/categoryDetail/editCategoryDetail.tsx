import { useContext, useState } from "react";
import { CategoryDetail } from "../../../../util"
import { categoryContext } from "../../../../hook/admin/contexts/categories";
import { IoIosCheckmark } from "react-icons/io";

const EditCategoryDetail = ({ value, onSubmit, onHandlePopup, onHandleFrom, onHandleSpecification, errorForm }: {
    value: CategoryDetail,
    onSubmit: () => void;
    onHandlePopup: (categoryDetail?: CategoryDetail) => void;
    onHandleFrom: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onHandleSpecification: (id:string) => void;
    errorForm: string
}) => {
    const { specification } = useContext(categoryContext)
    const [hoveredItem, setHoveredItem] = useState({ value: [''] });
    
    return (
        <>
            <div className="bg-white w-[750px] py-8 px-10 rounded-md shadow-lg relative">
                <button onClick={() => { onHandlePopup() }} className="absolute top-4 right-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h2 className="text-2xl font-semibold">Danh mục</h2>
                <p className=" text-red-500 pt-1">{errorForm}</p>
                <div className="flex gap-4 ">
                    <div className="w-1/2">
                        <div className="mt-4">
                            <label className="block mb-2">Tên</label>
                            <input type="text" onChange={(e) => { onHandleFrom(e) }} name="name" className="w-full border border-gray-300 rounded-md p-2" value={value.name} />
                        </div>
                        <div className="mt-4">
                            <label className="block mb-2">Địa chỉ hình ảnh</label>
                            <input type="text" onChange={(e) => { onHandleFrom(e) }} name="thumbnail" className="w-full border border-gray-300 rounded-md p-2" value={value.thumbnail} />
                        </div>
                        <div className=" py-3 max-h-44">
                            <img className=" object-cover  max-h-44 h-full rounded-md" src={value.thumbnail} alt="" />
                        </div>

                    </div>
                    <div className="w-1/2 border-l pl-4 relative">
                        <label htmlFor="">Danh mục thông số kĩ thuật</label>
                        <div className="flex flex-wrap gap-2 py-4  max-h-[300px] overflow-y-auto">
                            {specification.map((item, index) => {
                                return (
                                    <div key={index} className=" text-sm gap-1">
                                        <p
                                            onClick={() => { onHandleSpecification(item._id) }}
                                            onMouseEnter={() => setHoveredItem(item)}
                                            onMouseLeave={() => setHoveredItem({ value: [''] })}
                                            className={`
                                            ${item._id == value.specification.find((i) => i == item._id) ? 'bg-blue-500 text-white' : 'bg-gray-200'}
                                                 hover:text-white  hover:bg-blue-400 flex items-center cursor-pointer border px-2 py-1 rounded-lg `}>
                                            {item.name}
                                            <IoIosCheckmark />
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            {hoveredItem.value[0] && <div className=" shadow-xl rounded-md w-[200px] absolute border p-2  flex-col gap-2 flex z-50 bg-white top-0 right-full">
                                {hoveredItem.value.map((item, index) => {
                                    return (
                                        <div key={index} className="">
                                            <p className="text-sm">{item}</p>
                                        </div>
                                    )
                                })}
                            </div>}
                        </div>
                    </div>

                </div>
                <div className="mt-4 flex ml-auto ">
                    <button onClick={() => { onSubmit() }} className="px-4 py-2 ml-auto  bg-green-500 hover:bg-green-600 text-white rounded-md">Save</button>
                </div>
            </div >
        </>
    )
}

export default EditCategoryDetail