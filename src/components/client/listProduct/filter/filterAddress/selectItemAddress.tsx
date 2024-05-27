import { FaChevronRight } from "react-icons/fa"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"

const SelectItemAddressJSX = ({ handleShow, name, address, onHandleSelect }: { 
    handleShow: (address: string) => void, 
    name: string, 
    address: string,
    onHandleSelect: (id: string, action: string) => void;
}) => {
    const [nameAddress, setNameAddress] = useState('tỉnh thành')
    useEffect(()=>{
        if(address == 'district'){
            setNameAddress('quận huyện')
        }
        if(address == 'ward'){
            setNameAddress('xã phường')
        }
    },[address])
    return (
        <>
            <div onClick={() => handleShow(address)} className=" cursor-pointer flex justify-between border rounded-md px-2 py-1 items-center hover:bg-gray-100">
                {!name ?
                    <p className="py-1 text-sm font-medium">Chọn {nameAddress}</p> :
                    <div>
                        <p className=" text-xs">Chọn {nameAddress}</p>
                        <p className="py-0.5 text-sm "> {name} </p>
                    </div>
                }
                {!name ? <FaChevronRight /> : <p onClick={(event)=>{
                    event.stopPropagation()
                    onHandleSelect('',nameAddress)
                }} className=" text-lg"><MdDelete /></p>}
            </div>
        </>
    )
}

export default SelectItemAddressJSX