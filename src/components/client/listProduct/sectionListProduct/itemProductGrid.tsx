import { CiLocationOn } from "react-icons/ci"
import { Link } from "react-router-dom"
import { formatCurrency, TypeProduct } from "../../../../util"
import { getNameProvinceById } from "../../../../redux/features/address"
import '../../../../assets/slideHome.css'
const ItemProductGrid = ({ itemProduct }: { itemProduct: TypeProduct }) => {
    return (
        <Link to={`/detail-product/${itemProduct._id}`} className=" hover:shadow-xl p-3 border-b cursor-pointer">
            <div className=" w-full h-40">
                <img className=" object-cover w-full border h-40" src={`http://localhost:3000/uploads/${itemProduct.thumbnail[0]}`} alt="" />
            </div>
            <div className="py-2">
                <p className=" text-sm truncate"> {itemProduct.title} </p>
                <p className=" text-base text-red-600 font-semibold">{formatCurrency(itemProduct.price)} </p>
            </div>
            <div>
                <p className=" text-gray-500 text-xs flex gap-1"><CiLocationOn /> {getNameProvinceById(itemProduct.address.idProvince)} </p>
            </div>
        </Link>
    )
}

export const ItemProductGridLoading = ({length}:{length:number}) => {
    return (
        <>
            {[...Array(length)].map((_, index) => (
                <div key={index} className=" p-3 border-b ">
                    <div className=" rounded-md w-full h-40 skeleton"></div>
                    <div className="py-2">
                        <p className=" rounded-md skeleton py-2"> </p>
                        <p className=" rounded-md skeleton py-2 my-1"></p>
                    </div>
                    <div className=" rounded-md skeleton py-1 "></div>
                </div>
            ))}
        </>
    )
}

export default ItemProductGrid