import React, { useContext, useEffect, useState } from "react"
import { FaCaretDown } from "react-icons/fa"
import SelectCategory from "./selectCategory"
import '../../../../assets/addproduct.css'
import { categoryContext } from "../../../../hook/admin/contexts/categories"
import { defaultValueCategoryDetail, defaultValueSelectAddress, district, InterDataFormProduct, province, typeValueSelectAddress } from "../../../../util"
import SelectSpecification from "./selectSpecification"
import SelectTitleAndDescription from "./selectTitleAndDescription"
import FillterAddress from "./fillterAddress"
import Popup from "../../../admin/popup"
import { useGetdeliveryAddressIsDefaultQuery } from "../../../../redux/rtkQuery/deliveryAddress"
import { infoUserContext } from "../../../../hook/admin/contexts"
import { getValueSelectAddress, SelectDataDistrict, SelectDataWard, SelectProvince, setDistrict, setWard } from "../../../../redux/features/address"
import { useAppDispatch, useAppSelector } from "../../../../redux/hook"

interface ValueSpecification {
    [key: string]: string;
}

const InfoAddProduct = ({onHandleCategory,onSubmitForm,onHandleShowdemo}:{
    onHandleCategory: (slug: string) => void
    onSubmitForm: (dataForm: InterDataFormProduct|undefined) => void
    onHandleShowdemo:(value: boolean,dataForm: InterDataFormProduct| undefined) =>void
}) => {
    const [showSelectCategory, setShowSelectCategory] = useState(true)
    const [selectCategory, setSelectCategory] = useState({ name: '', slugCategoryDetail: '' })
    const { getCategoryDetailBySlug } = useContext(categoryContext)
    const [categoryDetail, setCategoryDetail] = useState(defaultValueCategoryDetail)
    const [valueSpecification, setValueSpecification] = useState<ValueSpecification>({});
    const [dataForm, setDataForm] = useState({} as InterDataFormProduct)
    const [errorForm, setErrorForm] = useState({ title:'', description:'', address:'', price:'' })
    
    const [showFillterAddress, setShowFillterAddress] = useState(false)
    const [filterAddress, setFillterAddress] = useState(defaultValueSelectAddress)

    const dispatch = useAppDispatch()
    const { infoUser } = useContext(infoUserContext)
    const provinces = useAppSelector(SelectProvince)
    const districts = useAppSelector(SelectDataDistrict)
    const wards = useAppSelector(SelectDataWard)
    
    const { data: defaultDelivery, isLoading, isSuccess } = useGetdeliveryAddressIsDefaultQuery(infoUser.sub)
    useEffect(()=>{
        if(!isLoading && isSuccess && defaultDelivery.length > 0){
            const province = provinces.find((item: province)=> item._id == defaultDelivery[0].address.idProvince)
            const district = districts.find((item: district) => item._id == defaultDelivery[0].address.idDistrict)
            dispatch(setDistrict(province?.id))
            dispatch(setWard(district?.id))
            setFillterAddress(getValueSelectAddress(defaultDelivery[0].address,provinces, districts,wards))
        }
    },[defaultDelivery, dispatch, districts, isLoading, isSuccess, provinces, wards])
    const handleShowSelectCategory = () => {
        setShowSelectCategory(false)
    }
    const handleSelectCategory = (value: { name: string, slugCategoryDetail: string }) => {
        setSelectCategory(value)
        setCategoryDetail(getCategoryDetailBySlug(value.slugCategoryDetail))
        onHandleCategory(value.slugCategoryDetail)
        setValueSpecification({})
    }

    const handleSpecification = (key: string, value: string) => {
        console.log(key,value);
        
        setValueSpecification({ ...valueSpecification, [key]: value })
    }
    const handleForm = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const target = event.target as HTMLInputElement;
        if (target.name) {
            setDataForm({ ...dataForm, [target.name]: target.value });
        }
    }
    const validateForm = () => {
        let isValid = true;
        const error = {...errorForm}
        error.title = validateFormTitle(dataForm.title);
        error.description = validateFormDescription(dataForm.description);
        if(!dataForm.price){
            error.price = 'Bạn phải điền giá bán';
        } else if ( Number(dataForm.price) < 0) {
            error.price = 'Giá tiền phải lớn hơn 0';
        }
        else {
            error.price = '';
        }
        if (filterAddress.address == '') {
            error.address = 'Bạn phải điền đủ thông tin địa chỉ'
        }else {
            error.address =''
        }
        if (error.title || error.description || error.address || error.price) {
            isValid = false;
            setErrorForm({...error})
        }else {
            setErrorForm({ title:'', description:'', address:'', price: '' })
        }
        return isValid;
    }
    const validateFormTitle = (title:string) => {
        if (!title) {
            setErrorForm({ ...errorForm, title: 'Vui lòng nhập tiêu đề' })
            return 'Vui lòng nhập tiêu đề'
        }
        if (title.length < 2) {
            setErrorForm({ ...errorForm, title: 'Tối thiểu 2 kí tự' })
            return 'Tối thiểu 2 kí tự'
        }
        if (title.length > 50) {
            setErrorForm({ ...errorForm, title: 'Tối đa 50 kí tự' })
            return 'Tối đa 50 kí tự'
        }
        setErrorForm({ ...errorForm, title: '' })
        return ''
    }
    const validateFormDescription = (description:string) => {
        
        if (!description) {
            setErrorForm({ ...errorForm, description: 'Vui lòng nhập mô tả chi tiết' })
            return 'Vui lòng nhập mô tả chi tiết'
        }
        if (description.length < 20) {
            setErrorForm({ ...errorForm, description: 'Tối thiểu 20 kí tự' })
            return 'Tối thiểu 20 kí tự'
        }
        if (description.length > 1500) {
            setErrorForm({ ...errorForm, description: 'Tối đa 1500 kí tự' })
            return 'Tối đa 1500 kí tự'
        }
        setErrorForm({ ...errorForm, description: '' })
        return ''
    }
    const handleShowFillterAddress = (select: typeValueSelectAddress) =>{
        setShowFillterAddress(!showFillterAddress)
        setFillterAddress(select)
      }
      const handleShow = () => {
          setShowFillterAddress(!showFillterAddress)
      }
    const onSubmit = () => {
        if(validateForm()) {
            const data = {
                ...dataForm,
                address:{
                    idProvince: filterAddress.province._id,
                    idDistrict: filterAddress.district._id,
                    idWard: filterAddress.ward._id,
                    address: filterAddress.address
                },
                specifications:valueSpecification
            }
            return data
        }
    }


    return (
        <>
            <div>
                <div onClick={() => setShowSelectCategory(true)} className="border rounded-md px-3 py-1 cursor-pointer" >
                    {!selectCategory.name ?
                        <p className=" flex gap-2 py-2 items-center text-base text-gray-500">Danh mục tin đăng <FaCaretDown /></p>
                        :
                        <div className="py-1">
                            <p className=" text-xs text-gray-500">Danh mục tin đăng</p>
                            <p className=" flex gap-2 items-center text-sm text-[#ff8800] font-semibold"> {selectCategory.name} </p>
                        </div>
                    }
                </div>

                {categoryDetail._id != '' ?
                    <div>
                        <SelectSpecification categoryDetail={categoryDetail} valueSpecification={valueSpecification} onHandleSpecification={handleSpecification} />

                        <div className=" py-4">
                            <SelectTitleAndDescription onHandleForm={handleForm} validateFormTitle={validateFormTitle} validateFormDescription={validateFormDescription} errorForm={errorForm} dataForm={dataForm} />
                        </div>

                        <div className=" py-2">
                            <h4 className=" font-semibold text-base pb-2">Địa chỉ người bán</h4>
                            <div className=" relative">
                                <div
                                    onClick={() => setShowFillterAddress(!showFillterAddress)}
                                    className="cursor-pointer px-4 py-2 border rounded-lg flex items-center gap-2 ">
                                    {filterAddress.province._name ?
                                        <p className=" pr-2 text-sm">
                                            {`${filterAddress.address}, ${filterAddress.ward._name}, ${filterAddress.district._name}, ${filterAddress.province._name}`}
                                        </p> :
                                    <p className=" flex gap-2 items-center">Địa chỉ<FaCaretDown /></p>}
                                </div>
                                {!filterAddress.address && <p className=" text-xs text-red-500 pt-1"> {errorForm.address}</p>}
                                
                                {showFillterAddress && <Popup onHandlePopup={handleShow}>
                                    <div className=" z-10 top-full left-0 w-[500px] pt-2">
                                        <FillterAddress onHandleShowFillterAddress={handleShowFillterAddress} filterAddress={filterAddress}  onHandlePopup={handleShow}/>
                                    </div>
                                </Popup>}
                            </div>
                        </div>

                        <div className="py-2">
                            <div className="flex justify-between items-center gap-4">
                                <div onClick={()=>onHandleShowdemo(validateForm(), onSubmit())} className=" cursor-pointer text-center w-full py-2 rounded-lg border border-[#ff8800] text-[#ff8800] font-semibold text-sm">
                                    <p>Xem trước</p>
                                </div>
                                <div onClick={() => onSubmitForm(onSubmit())} className=" cursor-pointer text-center w-full py-2 rounded-lg border bg-[#ff8800] text-white font-semibold text-sm">
                                    <p>Đăng tin</p>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>

                    </div>
                }
            </div>
            {showSelectCategory && <SelectCategory handleShowSelectCategory={handleShowSelectCategory} onHandleSelectCategory={handleSelectCategory} />}
        </>
    )
}

export default InfoAddProduct