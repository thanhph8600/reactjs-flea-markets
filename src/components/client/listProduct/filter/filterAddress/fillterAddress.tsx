import { BsBuildings } from "react-icons/bs"
import { useAppSelector } from "../../../../../redux/hook"
import { SelectDistrict, SelectProvince, SelectWard, setDistrict, setWard } from "../../../../../redux/features/address"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { defaultValueSelectAddress, defaultValueWard, district, province, typeValueSelectAddress, ward } from "../../../../../util"
import SelectItemAddressJSX from "./selectItemAddress"
import SelectDefault from "./selectDefault"
import ListValueSelect from "./listValueSelect"

const FillterAddress = ({ onHandleShowFillterAddress, filterAddress }: { 
    onHandleShowFillterAddress: (select: typeValueSelectAddress) => void 
    filterAddress: typeValueSelectAddress
}) => {
    const province = useAppSelector(SelectProvince)
    const district = useAppSelector(SelectDistrict)
    const ward = useAppSelector(SelectWard)
    const dispatch = useDispatch()
    const [isShowListSlect, setIsShowList] = useState(false)
    const [listShow, setListShow] = useState([] as province[] | district[] | ward[])
    const [select, setSelect] = useState(filterAddress)

    const handleShow = (address: string) => {
        setIsShowList(true)
        if (address == 'province') {
            setListShow(province)
            setSelect({ ...select, title: 'tỉnh thành' })
        }
        if (address == 'district') {
            setListShow(district)
            setSelect({ ...select, title: 'quận huyện' })
        }
        if (address == 'ward') {
            setListShow(ward)
            setSelect({ ...select, title: 'xã phường' })
        }
    }
    const handleListShow = (name: string) => {
        console.log(name);

    }
    const handleSelect = (id: string, action: string) => {
        setIsShowList(false)

        if (action == 'tỉnh thành') {
            const item = province.find((item: province) => item.id == id)
            setSelect({ ...defaultValueSelectAddress, province: item as province })
            dispatch(setDistrict(id))
        }
        if (action == 'quận huyện') {
            const item = district.find((item: district) => item.id == id)
            setSelect({ ...select, district: item as district , ward: defaultValueWard })
            dispatch(setWard(id))
        }
        if (action == 'xã phường') {
            const item = ward.find((item: ward) => item.id == id)
            setSelect({ ...select, ward: item as ward })
        }
    }
    return (
        <>
            {!isShowListSlect ?
                <div className=" bg-white p-4 shadow-2xl rounded border">
                    <p className="flex gap-2 items-center text-sm font-semibold"><BsBuildings /> Tìm theo khu vực</p>
                    <div className="flex gap-3 items-center pt-2">
                        <p onClick={() => {
                            handleSelect("1", "tỉnh thành")
                        }} className="px-2 py-1 rounded-xl text-sm  font-medium border bg-gray-100 cursor-pointer hover:bg-gray-200">Hồ Chí Minh</p>
                        <p onClick={() => {
                            handleSelect("2", "tỉnh thành")
                        }} className="px-2 py-1 rounded-xl text-sm  font-medium  border bg-gray-100 cursor-pointer hover:bg-gray-200">Hà Nội</p>
                        <p onClick={() => {
                            handleSelect("3", "tỉnh thành")
                        }} className="px-2 py-1 rounded-xl text-sm  font-medium  border bg-gray-100 cursor-pointer hover:bg-gray-200">Đà Nẵng</p>
                    </div>
                    <div>
                        <div className="flex flex-col gap-4 py-4">
                            <SelectItemAddressJSX handleShow={handleShow} name={select.province._name} address='province' />
                            {select.province._name ?
                                <SelectItemAddressJSX handleShow={handleShow} name={select.district._name} address='district' />
                                : <SelectDefault name="quận huyện" />}

                            {select.district._name ?
                                <SelectItemAddressJSX handleShow={handleShow} name={select.ward._name} address='ward' />
                                : <SelectDefault name="xã phường" />}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setSelect(defaultValueSelectAddress)} className="w-1/2 py-2 rounded-md border font-semibold hover:bg-gray-100">Hủy bỏ</button>
                        <button onClick={() => onHandleShowFillterAddress(select)} className="w-1/2 py-2 rounded-md font-semibold text-white bg-[#ff8800] ">Áp dụng</button>
                    </div>
                </div>
                :
                <ListValueSelect title={select.title} listShow={listShow} setIsShowList={setIsShowList} handleListShow={handleListShow} handleSelect={handleSelect} />
            }
        </>
    )
}

export default FillterAddress