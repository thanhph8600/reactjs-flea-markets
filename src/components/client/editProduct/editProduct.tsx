import { useNavigate, useParams } from "react-router-dom"
import { useGetProductByIDQuery } from "../../../redux/rtkQuery/productQuery"
import { useContext, useEffect, useState } from "react"
import { infoUserContext } from "../../../hook/admin/contexts"
import SelectImage from "../addProduct/selectImage"
import Popup from "../../admin/popup"
import DemoProduct from "../detailProduct/demoProduct"
import InfoUpdateProduct from "./infoProduct/detailProduct"
import { InterDataFormProduct } from "../../../util"
import { LoaderContex } from "../../../hook/admin/contexts/loader"
import requestApi from "../../../helper/api"
import { toast } from "react-toastify"

const EditProduct = () => {
  const { idProduct } = useParams()
  const navigate = useNavigate()
  const { infoUser } = useContext(infoUserContext)
  const { data: product, isSuccess } = useGetProductByIDQuery(idProduct)
  const [prevImages, setPrevImages] = useState([] as { preview: string }[])
  const [listFile, setListFile] = useState<File[]>([])
  const [showDemo, setShowDemo] = useState(false)
  const [errorFile, setErrorFile] = useState('')
  const [formDataProduct, setFormDataProduct] = useState({} as InterDataFormProduct)
  const { setLoader } = useContext(LoaderContex)
  useEffect(() => {
    if (infoUser.sub != '' && isSuccess) {
      if (infoUser.sub != product.id_customer[0]._id) {
        navigate('/')
      }
    }

  }, [infoUser.sub, isSuccess, navigate, product])
  useEffect(() => {
    if (isSuccess) {
      setPrevImages(product.thumbnail.map((item: string) => { return { preview: item } }))
      setListFile(product.thumbnail.map((item: string) => { return { preview: item } }))
    }
  }, [isSuccess, product])
  const handleFile = (files: File[]) => {
    setListFile(files)
  }
  const handlePrevImages = (value: { preview: string }[]) => {
    setPrevImages(value)
  }
  const handlePopup = () => {
    setShowDemo(!showDemo)
  }
  const onSubmitForm = (dataForm: InterDataFormProduct | undefined) => {
    const newListFile = listFile.filter((item)=> !item.preview)
    const outListFile = listFile.filter((item)=> item.preview).map((item)=> {
      return item.preview.split('/')[4]
    })
    
    const fileDelete = product.thumbnail.map((item: string)=> {
      return item.split('/')[4]
    }).filter((item:string) => !outListFile.includes(item))
    
    if(newListFile.length == 0 && outListFile.length == 0){
      window.scrollTo(0, 0);
      setErrorFile('Chọn ít nhất 1 ảnh')
      return
    }else{
      setErrorFile('')
    }
    
    if(dataForm) {
      dataForm.thumbnail = [...outListFile]

      requestApi('upload/delete-files', 'DELETE', fileDelete )
      if(newListFile.length > 0){
        const dataFile = new FormData();
        newListFile.forEach((image: File) => {
          dataFile.append('files', image);
        });
        uploadFile(dataFile, dataForm)
      }else{
        updateProduct(dataForm)
      }
    }
  }
  const uploadFile = (dataFile:FormData, dataForm:InterDataFormProduct) =>{
    setLoader(true)
    requestApi('upload/arr-files', 'POST', dataFile, 'multipart/form-data')
    .then(response => {
        dataForm.price = Number(dataForm.price)
        dataForm.thumbnail = [ ...dataForm.thumbnail, ...response.data.fileNames]
        updateProduct(dataForm)
    })
    .catch(err=>{
        console.log(err);
        setLoader(false)
        toast.error('có lỗi sảy ra')
    })
  }
  const updateProduct = (dataForm: InterDataFormProduct) =>{
    requestApi(`product/${idProduct}`, 'PATCH', dataForm, 'application/json').then((res)=>{
      console.log(res);
      setLoader(false)
      navigate(`/detail-product/${res.data._id}`)
  })
  .catch(err=>{
      console.log(err);
      setLoader(false)
      toast.error('có lỗi sảy ra')
  })    
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
      dataForm.thumbnail = prevImages.map((item) => { return item.preview })
      dataForm.address = product.address
      setFormDataProduct(dataForm)
    }
    setShowDemo(!showDemo)
  }
  return (
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
              {isSuccess && <InfoUpdateProduct onSubmitForm={onSubmitForm} onHandleShowdemo={handleShowDemo} product={product} />}
            </div>
          </div>
          {showDemo && isSuccess && <Popup onHandlePopup={handlePopup}>
            <div className=" min-w-[700px] max-h-screen overflow-y-auto">
              <DemoProduct product={formDataProduct} />
            </div>
          </Popup>}
        </div>
      </div>
    </div>
  )
}

export default EditProduct