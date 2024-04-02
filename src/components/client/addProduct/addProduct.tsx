import { useContext, useEffect, useState } from "react"
import SelectImage from "./selectImage"
import InfoAddProduct from "./infoProduct/detailProduct"
import Popup from "../../admin/popup";
import DemoProduct from "../detailProduct/demoProduct";
import requestApi from "../../../helper/api";
import { LoaderContex } from "../../../hook/admin/contexts/loader";
import { infoUserContext } from "../../../hook/admin/contexts";
import { CategoryDetail, InterDataFormProduct } from "../../../util";
import { categoryContext } from "../../../hook/admin/contexts/categories";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const AddProduct = () => {
    const navigate = useNavigate()
    const [formDataProduct, setFormDataProduct] = useState({} as InterDataFormProduct)
    const [prevImages, setPrevImages] = useState([] as { preview: string }[])
    const [listFile, setListFile] = useState<File[]>([])
    const [errorFile, setErrorFile] = useState('')
    const [showDemo, setShowDemo] = useState(false)
    const [itemCategoryDetail, setItemCategoryDetail] = useState({} as CategoryDetail)
    const {getCategoryDetailBySlug} = useContext(categoryContext)
    const { setLoader } = useContext(LoaderContex)
    const { infoUser } = useContext(infoUserContext)
    useEffect(() => {
        document.title = 'Đăng tin'
    }, [])
    const handleCategory = (slug: string) => {
        setItemCategoryDetail(getCategoryDetailBySlug(slug))
    }
    
    const onSubmitForm = (dataForm: InterDataFormProduct | undefined) => {
        if (!dataForm) return
        setFormDataProduct(dataForm)
        if (listFile.length == 0) {
            setErrorFile('Chọn ít nhất 1 ảnh')
            window.scrollTo(0, 0);
            return
        }
        setErrorFile('')
        const formData = new FormData();
        listFile.forEach((image: File) => {
            formData.append('files', image);
        });
        setLoader(true)
        requestApi('upload/arr-files', 'POST', formData, 'multipart/form-data')
            .then(response => {
                dataForm.id_customer = infoUser.sub
                dataForm.id_category = itemCategoryDetail.id_category
                dataForm.id_category_detail= itemCategoryDetail._id
                dataForm.price = Number(dataForm.price)
                dataForm.thumbnail = response.data.fileNames
                console.log(dataForm);
                
                requestApi('product', 'POST', dataForm, 'application/json').then((res)=>{
                    console.log(res);
                    setLoader(false)
                    navigate(`/detail-product/${res.data._id}`)
                })
                .catch(err=>{
                    console.log(err);
                    setLoader(false)
                    toast.error('có lỗi sảy ra')
                })             
            })
            .catch(err=>{
                console.log(err);
                setLoader(false)
                toast.error('có lỗi sảy ra')
            })
    }
    const handleFile = (files: File[]) => {
        setListFile(files)
    }
    const handlePrevImages = (value: { preview: string }[]) => {
        setPrevImages(value)
    }
    const handlePopup = () => {
        setShowDemo(!showDemo)
    }
    const handleShowDemo = (value: boolean, dataForm: InterDataFormProduct | undefined) => {
        if (!value) {
            window.scrollTo(0, 500);
            setErrorFile('Vui lòng điền đầy đủ thông tin')
            return
        }
        if (prevImages.length == 0) {
            window.scrollTo(0, 0);
            setErrorFile('Chọn ít nhất 1 ảnh')
            return
        }

        if (dataForm) {
            
            dataForm.thumbnail = prevImages.map((item)=>{return item.preview})
            setFormDataProduct(dataForm)
        }
        setShowDemo(!showDemo)
    }
    return (
        <>
            <div className=" w-[950px] m-auto py-6">
                <div className=" bg-white rounded-md border p-4 min-h-[600px]">
                    <div className=" flex gap-8 py-5 px-6">
                        <div className="w-1/3">
                            <div>
                                {errorFile && <p className=" bg-red-400 text-center text-white rounded py-1 mb-2"> {errorFile} </p>}
                                <SelectImage onHandleFile={handleFile} onHandlePrevImages={handlePrevImages} prevImages={prevImages} listFile={listFile} />
                            </div>
                        </div>
                        <div className="w-2/3">
                            <div>
                                <InfoAddProduct onHandleCategory={handleCategory} onSubmitForm={onSubmitForm} onHandleShowdemo={handleShowDemo} />
                            </div>
                        </div>
                        {showDemo && <Popup onHandlePopup={handlePopup}>
                            <div className=" min-w-[700px] max-h-screen overflow-y-auto">
                                <DemoProduct product={formDataProduct} />
                            </div>
                        </Popup>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct