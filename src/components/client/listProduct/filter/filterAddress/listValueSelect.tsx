import { FaArrowLeft } from "react-icons/fa"
import { district, province, ward } from "../../../../../util";
import { useEffect, useState } from "react";

const ListValueSelect = ({ title, listShow, setIsShowList, handleSelect }: {
    title: string;
    listShow: province[] | district[] | ward[];
    setIsShowList: (value: React.SetStateAction<boolean>) => void;
    handleSelect: (id: string, action: string) => void;
}) => {
    const [newListAddress, setNewListAddress] = useState([] as (province | district | ward)[])
    useEffect(() => {
        setNewListAddress(listShow)
    }, [listShow])
    const handleListShow = (value: string) => {
        const newValue = listShow.filter((item) => item._name.toLowerCase().includes(value.toLowerCase()))
        if(newValue)
            setNewListAddress(newValue)
    }
    return (
        <>
            <div className=" bg-white p-4 shadow-2xl rounded border">
                <div className=" font-semibold flex items-center justify-between">
                    <p className=" cursor-pointer" onClick={() => setIsShowList(false)}><FaArrowLeft /></p>
                    <p>Chọn {title}</p>
                    <p></p>
                </div>
                <input className=" my-2 w-full p-2 rounded border " type="text" onChange={(e) => handleListShow(e.target.value)} />
                <div className="flex flex-col overflow-x-auto h-[400px]  z-[9999]">
                    {
                        newListAddress.map((item) => {
                            return (
                                <div
                                    onClick={() => handleSelect(item.id, title)}
                                    key={item.id}
                                    className=" border-b p-3 cursor-pointer hover:bg-gray-100">
                                    {item._name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ListValueSelect