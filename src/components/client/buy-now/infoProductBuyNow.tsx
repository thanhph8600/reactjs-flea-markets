import { useNavigate } from "react-router-dom"
import { formatCurrency, TypeProductUpdate } from "../../../util"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import { memo, useEffect } from "react"
import { useGetProductByIDQuery } from "../../../redux/rtkQuery/productQuery";
import requestApi from "../../../helper/api";

const InfoProductBuyNow = memo(
    function InfoProductBuyNow(
        {
            idProduct,
            onHandleProduct
        }: {
            idProduct: string,
            onHandleProduct: (product: TypeProductUpdate) => void
        }) {
        const { data, isLoading, isSuccess } = useGetProductByIDQuery(idProduct)
        const navigate = useNavigate()
        useEffect(()=>{
            if(!isLoading && isSuccess && data) 
                onHandleProduct(data)
        },[data, isLoading, isSuccess, onHandleProduct])
        const handleMessWitchSeller = () => {
            if (isSuccess && data) {
                requestApi(`messenger/${data.id_customer[0]._id}`, 'POST', { id_product: idProduct })
                navigate(`/chat/${data.id_customer[0]._id}`)
            }
        }
        console.log('info product');
        
        return (

            <div className=" bg-white rounded shadow-md">
                {!isLoading && isSuccess && data && <div className=" p-4">
                    <div className=" flex justify-between pb-2">
                        <div className=" flex items-center gap-2">
                            <div className=" w-7 h-7">
                                <img className=" w-full h-full object-cover rounded-full" src={data.id_customer[0].avata} alt="" />
                            </div>
                            <p className=" uppercase text-sm font-semibold">{data.id_customer[0].name}</p>
                        </div>
                        <div>
                            <p onClick={() => handleMessWitchSeller()} className=" cursor-pointer flex items-center gap-2 border rounded px-2 py-1 text-sm text-green-500 hover:bg-green-500 hover:text-white" ><IoChatboxEllipsesOutline />Chat</p>
                        </div>
                    </div>
                    <div className=" flex gap-2">
                        <div className=" w-20 h-20">
                            <img className=" w-full h-full object-cover rounded" src={data.thumbnail[0]} alt="" />
                        </div>
                        <div className=" py-2">
                            <p className="pb-1 text-sm font-medium">{data.title}</p>
                            <p className=" text-sm font-semibold text-red-500"> {formatCurrency(data.price)} </p>
                        </div>
                    </div>
                </div>}
            </div>
        )
    });

export default InfoProductBuyNow