import { CiFilter } from "react-icons/ci"
import { FaCaretDown } from "react-icons/fa"
import { useState } from "react"
import FillterAddress from "./filterAddress/fillterAddress"
import { formatCurrency, typeValueSelectAddress } from "../../../../util"
import FillterPrice from "./filterPrice/fillterPrice"


const FilterProduct = ({ onHandleValueAddress, onHandleFilterPrice, filterAddress, filterPrice }: {
  onHandleValueAddress: (select: typeValueSelectAddress) => void,
  filterAddress: typeValueSelectAddress,
  onHandleFilterPrice: (min: number, max: number) => void,
  filterPrice: ({ min: number, max: number })
}) => {
  const [showFillterAddress, setShowFillterAddress] = useState(false)
  const [showtFillterPrice, setShowFilterPrice] = useState(false)
  const [error, setError] = useState('')

  const handleShowFillterAddress = (select: typeValueSelectAddress) => {
    setShowFillterAddress(!showFillterAddress)
    onHandleValueAddress(select)
  }

  const handleRangeChange = (min: number, max: number) => {
    if (min < 0 || max < 0) {
      setError('Giá phải lớn hơn 0')
      return
    }
    if (min >= max && min !=0 && max !=0) {
      setError('Giá tối thiểu phải nhỏ hơn giá tối đa')
      return
    }
    onHandleFilterPrice(min, max);
    setShowFilterPrice(!showtFillterPrice)
    setError('')
  };

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
              {filterAddress.district._name && filterAddress.district._name + ', '}
              {filterAddress.province._name}</p> :
            <p>Toàn quốc</p>}
          <FaCaretDown />
        </div>

        {showFillterAddress && <div className=" absolute z-10 top-full left-0 w-80 pt-2">
          <FillterAddress onHandleShowFillterAddress={handleShowFillterAddress} filterAddress={filterAddress} />
        </div>}
      </div>

      <div className=" relative">
        <div className=" px-4 py-2 border rounded-xl flex items-center gap-2 justify-center">
          {typeof filterPrice.min != "number" || !filterPrice.max ?
            <button
              onClick={() => setShowFilterPrice(!showtFillterPrice)}
              className="flex items-center gap-2 justify-center">
              Giá
              <FaCaretDown />
            </button> :
            <div
              onClick={() => setShowFilterPrice(!showtFillterPrice)}
              className=" cursor-pointer pr-2 text-[#ff8800] font-semibold">
              {formatCurrency(filterPrice.min)} - {formatCurrency(filterPrice.max)}
            </div>}
        </div>

        {showtFillterPrice &&
          <div

            className=" absolute z-10 top-full left-0 pt-2">
            <FillterPrice onChange={handleRangeChange} error={error} filterPrice={filterPrice} />
          </div>
        }
      </div>
      <button className=" px-4 py-2 border rounded-xl flex items-center gap-2 justify-center">
        Tình trạng
        <FaCaretDown />
      </button>
    </div>
  )
}
export default FilterProduct