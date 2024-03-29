import { FaChevronRight } from "react-icons/fa"

const SelectDefault = ( {name}: {name:string} ) => {
    return (
        <>
            <div className="cursor-not-allowed flex justify-between border rounded-md p-2 items-center ">
                <p className="py-2 text-sm font-medium text-gray-400">Chọn {name}</p>
                <FaChevronRight />
            </div>
        </>
    )
}

export default SelectDefault