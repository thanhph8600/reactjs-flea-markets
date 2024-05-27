import { Link } from "react-router-dom";
import { useGetProductByIDQuery } from "../../../../redux/rtkQuery/productQuery"
import { formatCurrency, User } from "../../../../util";

const ItemProductMess = ({ id_product,infoCustomer }: { id_product: string, infoCustomer:User }) => {
    const { data: product, isLoading, isSuccess } = useGetProductByIDQuery(id_product)
    return (
        <>
            {!isLoading && isSuccess && product &&
                <div className=" bg-white border rounded w-full max-w-80 overflow-hidden">
                    <div className="flex items-center gap-2 ">
                        <div className=" w-12 flex-shrink-0 p-1">
                            <img className="w-12 rounded" src={product.thumbnail[0]} alt="" />
                        </div>
                        <div className=" border-l px-2">
                            <Link to={`/detail-product/${product._id}`} className="font-semibold truncate"> {product.title} </Link>
                            <p className=" text-red-500"> {formatCurrency(product.price)} </p>
                        </div>
                    </div>
                    {product.id_customer[0]._id == infoCustomer._id &&  
                    <div className=" w-full border-t text-center text-sm text-green-500 font-semibold cursor-pointer">
                        <p>Mua ngay</p>
                    </div>}
                </div>
            }
        </>
    )
}

export default ItemProductMess