import { CiFilter } from "react-icons/ci"
import { FaCaretDown } from "react-icons/fa"
import { useState } from "react"
import FillterAddress from "./filterAddress/fillterAddress"
import { defaultValueSelectAddress, typeValueSelectAddress } from "../../../../util"


const FilterProduct = () => {
  const [showFillterAddress, setShowFillterAddress] = useState(false)
  const [filterAddress, setFillterAddress] = useState(defaultValueSelectAddress)
  const handleShowFillterAddress = (select: typeValueSelectAddress) =>{
    setShowFillterAddress(!showFillterAddress)
    setFillterAddress(select)
  }
  return (
    <div className=" flex gap-2">
      <div className="flex gap-2 items-center border-r px-2">
        <p className="text-lg"><CiFilter /></p>
        <p className="">Lọc</p>
      </div>

      <div className=" relative">
        <div
          onClick={() => setShowFillterAddress(!showFillterAddress)}
          className="cursor-pointer px-4 py-2 border rounded-xl flex items-center gap-2 justify-center ">
          {filterAddress.province._name ? 
          <p className=" pr-2 text-[#ff8800] font-semibold">
             {filterAddress.ward._name && filterAddress.ward._name + ', '} 
             {filterAddress.district._name  && filterAddress.district._name + ', '}
             {filterAddress.province._name}</p> : 
          <p>Toàn quốc</p>}
          <FaCaretDown />
        </div>

        {showFillterAddress && <div className=" absolute z-10 top-full left-0 w-80 pt-2">
          <FillterAddress onHandleShowFillterAddress={handleShowFillterAddress} filterAddress={filterAddress} />
        </div>}
      </div>

      <button className=" px-4 py-2 border rounded-xl flex items-center gap-2 justify-center">
        Giá
        <FaCaretDown />
      </button>
      <button className=" px-4 py-2 border rounded-xl flex items-center gap-2 justify-center">
        Tình trạng
        <FaCaretDown />
      </button>
    </div>
  )
}
export default FilterProduct