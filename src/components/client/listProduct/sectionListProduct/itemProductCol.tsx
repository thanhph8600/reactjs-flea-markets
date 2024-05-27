import { CiLocationOn } from "react-icons/ci"
import { Link } from "react-router-dom"
import { formatCurrency, TypeProduct, typeValueSelectAddress } from "../../../../util"
import { SelectDataDistrict, SelectDataWard, SelectProvince } from "../../../../redux/features/address"
import { handleShowAddressByFillterAddress } from "./setProductByCategory"
import { useAppSelector } from "../../../../redux/hook"

const ItemProductCol = ({ itemProduct, fillterAddress }: { itemProduct: TypeProduct,fillterAddress : typeValueSelectAddress }) => {
    const province = useAppSelector(SelectProvince)
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    return (
        <Link to={`/detail-product/${itemProduct._id}`} className=" hover:shadow-xl p-3 border-b cursor-pointer flex gap-3">
            <div className=" w-1/4 h-32 ">
                <img className=" object-cover m-auto h-full" src={itemProduct.thumbnail[0]} alt="" />
            </div>
            <div className=" w-3/4 py-2 flex gap-2 flex-col">
                <p className=" text-sm truncate">{itemProduct.title} </p>
                <p className=" text-base text-red-600 font-semibold">{formatCurrency(itemProduct.price)} </p>
                <p className=" text-gray-500 text-xs flex gap-1">
                    <CiLocationOn /> 
                    {handleShowAddressByFillterAddress(itemProduct.address,fillterAddress,province,district,ward)}
                </p>
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