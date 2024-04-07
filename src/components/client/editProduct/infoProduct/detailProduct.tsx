import React, {  useEffect, useState } from "react"
import '../../../../assets/addproduct.css'
import {  InterDataFormProduct, TypeProductUpdate } from "../../../../util"
import SelectSpecification from "./selectSpecification"
import SelectTitleAndDescription from "./selectTitleAndDescription"
import { getAddress, SelectDataDistrict, SelectDataWard } from "../../../../redux/features/address"
import { useAppSelector } from "../../../../redux/hook"

interface ValueSpecification {
    [key: string]: string;
}

const InfoUpdateProduct = ({ onSubmitForm, onHandleShowdemo, product }: {
    onSubmitForm: (dataForm: InterDataFormProduct | undefined) => void
    onHandleShowdemo: (value: boolean, dataForm: InterDataFormProduct | undefined) => void
    product: TypeProductUpdate
}) => {
    
    const [valueSpecification, setValueSpecification] = useState<ValueSpecification>({});
    const [dataForm, setDataForm] = useState({} as InterDataFormProduct)
    const [errorForm, setErrorForm] = useState({ title: '', description: '', address: '', price: '' })
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    useEffect(()=>{
        setValueSpecification(product.specifications)
        setDataForm({ ...dataForm, title: product.title, description: product.description, price: product.price });
    },[product.specifications])
    
    const handleSpecification = (key: string, value: string) => {
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
        const error = { ...errorForm }
        error.title = validateFormTitle(dataForm.title);
        error.description = validateFormDescription(dataForm.description);
        if (!dataForm.price) {
            error.price = 'Bạn phải điền giá bán';
        } else if (Number(dataForm.price) < 0) {
            error.price = 'Giá tiền phải lớn hơn 0';
        }
        else {
            error.price = '';
        }

        if (error.title || error.description || error.address || error.price) {
            isValid = false;
            setErrorForm({ ...error })
        } else {
            setErrorForm({ title: '', description: '', address: '', price: '' })
        }
        return isValid;
    }
    const validateFormTitle = (title: string) => {
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
    const validateFormDescription = (description: string) => {

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
    const onSubmit = () => {
        if (validateForm()) {
            const data = {
                ...dataForm,
                specifications: valueSpecification
            }
            return data
        }
    }


    return (
        <>
            <div>
                <div className="border rounded-md px-3 py-1 cursor-not-allowed bg-gray-200" >
                    <div className="py-1">
                        <p className=" text-xs text-gray-500">Danh mục tin đăng</p>
                        <p className=" flex gap-2 items-center text-sm text-[#ff8800] font-semibold">
                            {product.id_category[0].name}, {product.id_category_detail[0].name}
                        </p>
                    </div>
                </div>

                    <div>
                        <SelectSpecification categoryDetail={product.id_category_detail[0]} valueSpecification={valueSpecification} onHandleSpecification={handleSpecification} />

                        <div className=" py-4">
                            <SelectTitleAndDescription onHandleForm={handleForm} validateFormTitle={validateFormTitle} validateFormDescription={validateFormDescription} errorForm={errorForm} dataForm={dataForm} />
                        </div>

                        <div className=" py-2">
                            <h4 className=" font-semibold text-base pb-2">Địa chỉ người bán</h4>
                            <div className=" relative">
                                <div className=" cursor-not-allowed bg-gray-200 px-4 py-2 border rounded-lg flex items-center gap-2 ">
                                        <p className=" pr-2 text-sm">
                                            { getAddress(product.address, district, ward) }
                                        </p>
                                </div>
                            </div>
                        </div>

                        <div className="py-2">
                            <div className="flex justify-between items-center gap-4">
                                <div onClick={() => onHandleShowdemo(validateForm(), onSubmit())} className=" cursor-pointer text-center w-full py-2 rounded-lg border border-[#ff8800] text-[#ff8800] font-semibold text-sm">
                                    <p>Xem trước</p>
                                </div>
                                <div onClick={() => onSubmitForm(onSubmit())} className=" cursor-pointer text-center w-full py-2 rounded-lg border bg-[#ff8800] text-white font-semibold text-sm">
                                    <p>Cập nhật</p>
                                </div>
                            </div>
                        </div>
                    </div> 
            </div>
        </>
    )
}

export default InfoUpdateProduct