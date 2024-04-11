import React, { useContext, useEffect, useState } from 'react'
import { infoUserContext } from '../../../../hook/admin/contexts'
import { useGetdeliveryAddressByIddeliveryQuery, useGetdeliveryAddressIsDefaultQuery } from '../../../../redux/rtkQuery/deliveryAddress'
import { useAppDispatch, useAppSelector } from '../../../../redux/hook'
import { SelectDistrict, SelectProvince, SelectWard, setDistrict, setWard } from '../../../../redux/features/address'
import { classInputForm, classLableForm, deliveryAddress, district, province, typeAddressInProduct, ward } from '../../../../util'
import { checkDataFormCareateDelivery } from '../../../../util/validate/validateFormCreateDelivery'
import { createDeleveryAddress } from '../../../../redux/features/deliveryAddress'
import { toast } from 'react-toastify'
import { IoClose } from 'react-icons/io5'
import { FaChevronDown } from 'react-icons/fa'

const CreateDeliveryAddress = ({ onHandlePopup, onCloseShow }: { onHandlePopup: () => void, onCloseShow: () => void }) => {

    const { infoUser } = useContext(infoUserContext)
    const { refetch: refetchListDelivery } = useGetdeliveryAddressByIddeliveryQuery(infoUser.sub)
    const { refetch: refetchDefalutDelivery } = useGetdeliveryAddressIsDefaultQuery(infoUser.sub)
    const dispatch = useAppDispatch()
    const province = useAppSelector(SelectProvince)
    const district = useAppSelector(SelectDistrict)
    const ward = useAppSelector(SelectWard)
    const [selectAddress, setSelectAddress] = useState({} as typeAddressInProduct)
    const [dataCreateDelivery, setDataCreateDelivery] = useState({} as deliveryAddress)
    const [errorForm, setErrorForm] = useState({} as deliveryAddress)
    useEffect(() => {
        setDataCreateDelivery({ ...dataCreateDelivery, id_customer: [infoUser.sub], name: infoUser.username, phone: infoUser.phone, isDefault: true })
    }, [infoUser])
    const setValueDelivery = (value: React.ChangeEvent<HTMLInputElement>) => {
        const name = value.target.name
        if (name == 'isDefault') {
            setDataCreateDelivery({ ...dataCreateDelivery, [name]: value.target.checked })
            return
        }
        setDataCreateDelivery({ ...dataCreateDelivery, [name]: value.target.value })

    }
    const handleAddress = (value: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {
        const name = value.target.name
        const id = value.target.value

        if (name == 'province') {
            const item = province.find((item: province) => item.id == id)
            if (item)
                setSelectAddress({ ...selectAddress, idProvince: item._id, idDistrict: '', idWard: '', address: '' })
            dispatch(setDistrict(id))
            dispatch(setWard(0))
        }
        if (name == 'district') {
            const item = district.find((item: district) => item.id == id)
            if (item)
                setSelectAddress({ ...selectAddress, idDistrict: item._id, idWard: '', address: '' })
            dispatch(setWard(id))
        }
        if (name == 'ward') {
            const item = ward.find((item: ward) => item.id == id)
            if (item)
                setSelectAddress({ ...selectAddress, idWard: item._id, address: '' })
        }
        if (name == 'address') {
            setSelectAddress({ ...selectAddress, address: id })
        }
    }
    const onSubmit = () => {
        const data = { ...dataCreateDelivery, address: selectAddress }
        const error = checkDataFormCareateDelivery(data)
        if (error.isDefault) {
            setErrorForm(error)
            return
        }
        setErrorForm(error)
        dispatch(createDeleveryAddress(data))
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((data: any) => {
                console.log(data);
                refetchListDelivery()
                refetchDefalutDelivery()
                if (data.payload.isDefault) {
                    onCloseShow()
                } else {
                    onHandlePopup()
                }

            })
            .catch((error) => {
                console.log(error);
                toast('Thêm thất bại')
            })
    }
    return (
        <div className=" bg-white pb-12 p-4 px-6 relative rounded z-20">
            <p onClick={() => onHandlePopup()} className=" absolute top-3 right-2 text-2xl cursor-pointer"><IoClose /></p>
            <p className=" py-4 font-semibold text-center text-base">Địa chỉ nhận hàng</p>
            <p className=" text-sm py-1 text-gray-600">Vui lòng điền đúng thông tin để người bán liên hệ được với bạn</p>
            <div className=" py-4 flex flex-col gap-8">
                <div className="relative w-full min-w-[200px] h-10">
                    <input
                        onChange={(e) => setValueDelivery(e)}
                        className={classInputForm}
                        value={dataCreateDelivery.name}
                        name="name"
                        placeholder=" " />
                    <label
                        className={classLableForm}>
                        Tên người nhận
                    </label>
                    <p className=" text-red-500 text-xs"> {errorForm.name} </p>
                </div>

                <div className=" flex gap-2">
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            onChange={(e) => setValueDelivery(e)}
                            className={classInputForm}
                            name="phone"
                            value={dataCreateDelivery.phone}
                            placeholder=" " />
                        <label
                            className={classLableForm}>
                            Số điện thoại
                        </label>
                        <p className=" text-red-500 text-xs"> {errorForm.phone} </p>
                    </div>
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            onChange={(e) => setValueDelivery(e)}
                            className={classInputForm}
                            value={dataCreateDelivery.email}
                            name="email"
                            placeholder=" " />
                        <label
                            className={classLableForm}>
                            Email
                        </label>
                    </div>

                </div>
            </div>
            <div className=" pb-2 pt-4 ">
                <div className="flex flex-col gap-6">
                    <div className=" w-full">
                        <select onChange={(e) => handleAddress(e)} id="province" name="province" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={``}> Chọn Thành phố </option>
                            {province && province.map(item => {
                                return <option key={item._id} value={item.id}> {item._name} </option>
                            })}
                        </select>
                    </div>
                    <div className=" w-full">
                        {district.length > 2 ? <select onChange={(e) => handleAddress(e)} id="district" name="district" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={``}> Chọn Quận huyện </option>
                            {district && district.map(item => {
                                return <option key={item._id} value={item.id}> {item._name} </option>
                            })}
                        </select> :
                            <div className=" bg-gray-300 cursor-not-allowed flex justify-between border rounded-md p-1 items-center ">
                                <p className="py-1 text-sm font-medium text-gray-400">Chọn Quận huyện</p>
                                <FaChevronDown />
                            </div>}

                    </div>
                    <div className=" w-full">
                        {ward.length > 2 ? <select onChange={(e) => handleAddress(e)} id="ward" name="ward" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={``}>  Chọn xã phường </option>
                            {ward && ward.map(item => {
                                return <option key={item._id} value={item.id}> {item._name} </option>
                            })}
                        </select> :
                            <div className=" bg-gray-300 cursor-not-allowed flex justify-between border rounded-md p-1 items-center ">
                                <p className="py-1 text-sm font-medium text-gray-400">Chọn xã phường</p>
                                <FaChevronDown />
                            </div>
                        }
                    </div>
                    <div className="relative w-full min-w-[200px] h-10">
                        {selectAddress.idWard ? <input
                            onChange={(e) => handleAddress(e)}
                            className={classInputForm}
                            value={selectAddress.address}
                            name="address"
                            placeholder=" " /> :
                            <input type="text" readOnly className={` w-full cursor-not-allowed border rounded-md p-2 outline-none`} />}
                        <label
                            className={classLableForm}>
                            Địa chỉ cụ thể
                        </label>
                    </div>
                </div>
                <p className=" text-red-500 text-xs pt-2"> {errorForm.address && errorForm.address.address} </p>

            </div>
            <div className=" pb-2 felx gap-4">
                <input checked={dataCreateDelivery.isDefault} onChange={(e) => setValueDelivery(e)} type="checkbox" name="isDefault" id="isDefault" />
                <label htmlFor="isDefault" className=" pl-2">Chọn làm địa chỉ mặc định</label>
            </div>
            <div onClick={() => onSubmit()} className="py-2 font-semibold border bg-[#ff8800] text-center text-white text-base cursor-pointer rounded">
                <p>Xác nhận</p>
            </div>
        </div>
    )
}

export default CreateDeliveryAddress