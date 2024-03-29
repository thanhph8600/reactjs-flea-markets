import { FaChevronRight } from "react-icons/fa"
import { useEffect, useState } from "react"

const SelectItemAddressJSX = ({ handleShow, name, address }: { handleShow: (address: string) => void, name: string, address: string }) => {
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
                <FaChevronRight />
            </div>
        </>
    )
}

export default SelectItemAddressJSX