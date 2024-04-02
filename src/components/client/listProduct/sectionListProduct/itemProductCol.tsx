import { CiLocationOn } from "react-icons/ci"
import { Link } from "react-router-dom"
import { formatCurrency, TypeProduct } from "../../../../util"
import { getNameProvinceById } from "../../../../redux/features/address"

const ItemProductCol = ({ itemProduct }: { itemProduct: TypeProduct }) => {
    return (
        <Link to={`/detail-product/${itemProduct._id}`} className=" hover:shadow-xl p-3 border-b cursor-pointer flex gap-3">
            <div className=" w-1/4 h-30">
                <img className=" object-cover h-30" src={`http://localhost:3000/uploads/${itemProduct.thumbnail[0]}`} alt="" />
            </div>
            <div className=" w-3/4 py-2 flex gap-2 flex-col">
                <p className=" text-sm truncate">{itemProduct.title} </p>
                <p className=" text-base text-red-600 font-semibold">{formatCurrency(itemProduct.price)} </p>
                <p className=" text-gray-500 text-xs flex gap-1"><CiLocationOn /> {getNameProvinceById(itemProduct.address.idProvince)} </p>
            </div>
        </Link>
    )
}
export const ItemProductColLoading = ({ length }: { length: number }) => {
    return (
        <>
            {
                [...Array(length)].map((_, index) => {
                    <div key={index} className=" p-3 border-b flex gap-3">
                        <div className=" w-1/4 h-30  rounded-md skeleton"></div>
                        <div className=" w-3/4 py-2 flex gap-2 flex-col">
                            <p className="rounded-md skeleton py-2"></p>
                            <p className="rounded-md skeleton py-2"></p>
                            <p className="rounded-md skeleton py-1"></p>
                        </div>
                    </div>
                })
            }
        </>
    )
}

export default ItemProductCol