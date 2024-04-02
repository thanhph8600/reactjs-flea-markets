import { IoMdClose } from "react-icons/io"
import Popup from "../../../admin/popup"
import { useContext, useEffect, useState } from "react"
import { categoryContext } from "../../../../hook/admin/contexts/categories"
import { Category, CategoryDetail } from "../../../../util"
import { FaArrowLeft, FaChevronRight } from "react-icons/fa"

const SelectCategory = ({ handleShowSelectCategory,onHandleSelectCategory }: { 
    handleShowSelectCategory: () => void,
    onHandleSelectCategory: (value: {name: string; slugCategoryDetail: string;}) => void,
}) => {
    const { listCategory, getListCategoryDetailBySlug } = useContext(categoryContext)
    const [listCategoryShow, setListCategoryShow] = useState([] as CategoryDetail[] | Category[])
    const [checkSelectDetailCate, setCheckSelect] = useState(false)
    const [select,setSelect] = useState({name:'', slugCategoryDetail:''})
    useEffect(() => {
        setListCategoryShow(listCategory)
    }, [listCategory])
    const handleCategory = (slug: string) => {
        if (select.name == ''){
            setCheckSelect(true)
            setListCategoryShow(getListCategoryDetailBySlug(slug))
            const cate = listCategory.find((item) => item.link == slug)
            if (cate) setSelect({name: cate.name, slugCategoryDetail : ''})
        }else {
            
            const cateDetail = listCategoryShow.find((item)=> item.link ==  slug)
            
            if(cateDetail?.name) {
                const value = {
                    name: select.name + ' - ' + cateDetail.name,
                    slugCategoryDetail: slug
                }
                onHandleSelectCategory(value)
                handleShowSelectCategory()
            }
        }
    }
    const handleCheckSelect = () => {
        setListCategoryShow(listCategory)
        setCheckSelect(false)
        setSelect({name:'', slugCategoryDetail : ''})
    }
    return (
        <>
            <Popup onHandlePopup={handleShowSelectCategory}>
                { listCategory.length > 1 && <div className=" fixed top-1/4 left-1/2  -translate-x-1/2 -translate-y-1/4">
                    <div className="bg-white rounded-md w-[600px]">
                        <div className=" bg-gray-200 font-semibold rounded-t-md flex p-2 items-center justify-between">
                            {!checkSelectDetailCate ?
                                <p onClick={() => handleShowSelectCategory()} className=" cursor-pointer"><IoMdClose /></p>
                                :
                                <p onClick={() => handleCheckSelect()} className=" cursor-pointer"><FaArrowLeft /></p>
                            }
                            <p>Đăng tin</p>
                            <p></p>
                        </div>
                        <div className=" py-6 px-4">
                            <div>
                                <h4 className=" font-semibold uppercase text-sm pb-3">Chọn danh mục</h4>
                                <div className=" border rounded max-h-[500px] overflow-y-auto">
                                    {listCategoryShow.map((item: Category) => {
                                        return (
                                            <div key={item._id}>
                                                <div onClick={() => { handleCategory(item.link) }} className="flex cursor-pointer items-center justify-between p-2 border-b">
                                                    <div className=" flex gap-2 items-center">
                                                        <img className=" w-8 h-8" src={item.thumbnail} alt="" />
                                                        {item.name}
                                                    </div>
                                                    <div>
                                                        <FaChevronRight />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </Popup>
        </>

    )
}

export default SelectCategory