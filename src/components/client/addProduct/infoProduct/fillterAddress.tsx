import { useDispatch } from "react-redux"
import { useState } from "react"
import { defaultValueSelectAddress, defaultValueWard, district, province, typeValueSelectAddress, ward } from "../../../../util"
import { SelectDistrict, SelectProvince, SelectWard, setDistrict, setWard } from "../../../../redux/features/address"
import { useAppSelector } from "../../../../redux/hook"
import SelectItemAddressJSX from "../../listProduct/filter/filterAddress/selectItemAddress"
import SelectDefault from "../../listProduct/filter/filterAddress/selectDefault"
import ListValueSelect from "../../listProduct/filter/filterAddress/listValueSelect"
import { IoClose } from "react-icons/io5"

const FillterAddress = ({ onHandleShowFillterAddress, filterAddress, onHandlePopup }: { 
    onHandleShowFillterAddress: (select: typeValueSelectAddress) => void 
    filterAddress: typeValueSelectAddress
    onHandlePopup:() => void
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
    const hadnleAddress = (address:string) => {
        setSelect({...select, address})
    }
    return (
        <>
            {!isShowListSlect ?
                <div className=" bg-white p-4 shadow-2xl rounded border relative">
                    <p onClick={()=>{onHandlePopup()}} className=" absolute right-5 top-5 text-lg cursor-pointer"><IoClose /></p>
                    <p className="text-lg  text-center font-semibold">Địa chỉ</p>
                    <div>
                        <div className="flex flex-col gap-4 py-4">
                            <SelectItemAddressJSX handleShow={handleShow} name={select.province._name} address='province'  onHandleSelect={handleSelect}/>
                            {select.province._name ?
                                <SelectItemAddressJSX handleShow={handleShow} name={select.district._name} address='district'  onHandleSelect={handleSelect}/>
                                : <SelectDefault name="quận huyện" />}

                            {select.district._name ?
                                <SelectItemAddressJSX handleShow={handleShow} name={select.ward._name} address='ward' onHandleSelect={handleSelect} />
                                : <SelectDefault name="xã phường" />}
                            {
                                select.ward._name ? 
                                <input type="text" onChange={(e)=>hadnleAddress(e.target.value)} className=" border rounded-md p-2 outline-none" placeholder="Đia chỉ cụ thể"/>
                                 :
                                 <input type="text" readOnly className=" cursor-not-allowed border rounded-md p-2 outline-none" placeholder="Đia chỉ cụ thể"/>
                            }
                            
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => onHandleShowFillterAddress(select)} className=" w-full py-2 rounded-md font-semibold text-white bg-[#ff8800] ">Xong</button>
                    </div>
                </div>
                :
                <ListValueSelect title={select.title} listShow={listShow} setIsShowList={setIsShowList} handleSelect={handleSelect} />
            }
        </>
    )
}

export default FillterAddress