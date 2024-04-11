import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { categoryContext } from "../../../../hook/admin/contexts/categories"
import { CategoryDetail, convertToSlug, defaultValueCategory, defaultValueCategoryDetail } from "../../../../util"
import { IoAddCircle } from "react-icons/io5"
import ItemCategoryDetail from "./itemCategoryDetail"
import Popup from "../../popup"
import EditCategoryDetail from "./editCategoryDetail"
import requestApi from "../../../../helper/api"
import { toast } from "react-toastify"

const ListCategoryDetail = () => {
    //getvalue
    const { slug } = useParams()
    const [listCategoryDetail, setListCategoryDetail] = useState([defaultValueCategoryDetail])
    const [category, setCategory] = useState(defaultValueCategory)
    const { getListCategoryDetailBySlug, getCategoryBySlug, callAPI } = useContext(categoryContext)
    useEffect(() => {
        if (slug) {
            setListCategoryDetail(getListCategoryDetailBySlug(slug))
            setCategory(getCategoryBySlug(slug))
        }
    }, [getCategoryBySlug, getListCategoryDetailBySlug, slug])

    //CURD
    const [showPopup, setShowPopup] = useState(false)
    const [formCategoryDetail, setFormCategorydetail] = useState(defaultValueCategoryDetail)
    const [errorForm, setErrorForm] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const handlePopup = (categoryDetail?:CategoryDetail) => {
        setShowPopup(!showPopup)
        setErrorForm('')
        if(categoryDetail){
            setIsEdit(true)
            setFormCategorydetail(categoryDetail)
        }else{
            setIsEdit(false)
            setFormCategorydetail(defaultValueCategoryDetail)
        }
    }
    const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormCategorydetail({ ...formCategoryDetail, [e.target.name]: e.target.value })
    }
    const handleSpecification = (id:string) => {
        const index = formCategoryDetail.specification.findIndex((item) => item === id)
        if (index !== -1) {
            formCategoryDetail.specification.splice(index, 1)
        } else {
            formCategoryDetail.specification.push(id)
        }
        setFormCategorydetail({ ...formCategoryDetail })        
    }
    const validaionForm = () => {
        if (formCategoryDetail.name.length < 1) {
            setErrorForm('Tên danh mục phải lớn hơn 1 ký tự')
            return false
        }
        const checkName = listCategoryDetail.findIndex((item: CategoryDetail) => {
            return item.link === `mua-ban-${convertToSlug(formCategoryDetail.name)}` && item._id !== formCategoryDetail._id
        })
        if (checkName !== -1) {
          setErrorForm('Tên danh mục đã tồn tại');
          return false;
        }
        const reg = new RegExp('^(http|https)://[^ "]+$');
        if (!reg.test(formCategoryDetail.thumbnail)) {
            setErrorForm('Địa chỉ hình ảnh không hợp lệ!')
            return false
        }
        const spec = formCategoryDetail.specification
        if (spec.length === 0 || spec[0] === '' && spec.length === 1) {
            setErrorForm('Danh mục thông số kĩ thuật không được để trống')
            return false
        }
        setErrorForm('')
        return true
    }
    const onSubmit = () => {
        if (validaionForm()) {
            formCategoryDetail.id_category = category._id
            formCategoryDetail.link = `mua-ban-${convertToSlug(formCategoryDetail.name)}`
            const {_id, ...body} = formCategoryDetail
            if(isEdit){
                requestApi(`detail-category/${_id}`, 'PATCH', body).then(() => { 
                    susscess()
                }, error => {
                    error.response.data.message && toast.error(error.response.data.message)
                })
            }else{
                requestApi('detail-category', 'POST', body).then(() => { 
                    susscess()
                }, error => {
                    error.response.data.message && toast.error(error.response.data.message)
                })
            }
            handlePopup()
        }
    }
    const susscess = () => {
        callAPI()
        toast.success('Thành công')
    }
    const onDelete = (id: string) => {
        requestApi(`detail-category/${id}`, 'DELETE', {}).then(() => {
            susscess()
        }, error => {
            toast.error('Xóa thất bại')
            console.log(error);
        })
    }
    return (
        <>{
            showPopup && <Popup onHandlePopup={handlePopup} >
                <EditCategoryDetail value={formCategoryDetail} onSubmit={onSubmit} onHandlePopup={handlePopup} onHandleFrom={handleForm}  errorForm={errorForm} onHandleSpecification={handleSpecification} />
            </Popup>
        }
            <div>
            <div className="text-lg font-semibold flex gap-5 items-center  border-b mb-4 py-2">
                                        {/* <img src={category.thumbnail} className="w-16" alt="" /> */}
                                        {category.name}
                                    </div>
                <div className="border p-4 rounded-md shadow-lg">
                    <div className="flex flex-col">
                        
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">

                                <div className="overflow-hidden">
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">Hình ảnh</th>
                                                <th scope="col" className="px-6 py-4">Tên danh mục</th>
                                                <th scope="col" className="px-6 py-4"></th>
                                                <th scope="col" className="px-6 py-4">
                                                    <button onClick={() => {handlePopup()}} className="px-4 py-2 rounded bg-green-500 text-white flex gap-2 items-center">
                                                        Thêm mới
                                                        <IoAddCircle />
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listCategoryDetail.map((item: CategoryDetail, index) => {
                                                return <ItemCategoryDetail key={index} categoryDetail={item} onHandlePopup={handlePopup} onDelete={onDelete} />
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default ListCategoryDetail