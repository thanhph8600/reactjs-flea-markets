import { IoAddOutline } from "react-icons/io5"
import { formatCurrency, TypeProduct } from "../../../util"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useGetAllProductQuery, useGetProductByCusomterQuery } from "../../../redux/rtkQuery/productQuery"
import ListMyProduct from "./listMyProduct"
import { infoUserContext } from "../../../hook/admin/contexts"
import { useAppDispatch, useAppSelector } from "../../../redux/hook"
import { SelectLoadingProduct, updateStatusProduct } from "../../../redux/features/product"
import { toast } from "react-toastify"
import { useGetWalletQuery } from "../../../redux/rtkQuery/walletRktQuery"

const ManagementProduct = () => {
    const navigate = useNavigate()
    const { infoUser } = useContext(infoUserContext)
    const { idProduct } = useParams()
    const { data: products, isSuccess, refetch } = useGetProductByCusomterQuery()
    const { refetch: refetchListProduct } = useGetAllProductQuery()
    const [listProduct, setListProduct] = useState([] as TypeProduct[])
    const [select, setSelect] = useState('')
    const dispatch = useAppDispatch()
    const loadingUpdateProduct = useAppSelector(SelectLoadingProduct)
    const {data: wallet} = useGetWalletQuery()
    const classSelect = {
        active: "font-semibold px-6 py-2 cursor-pointer border-b-4 border-b-[#ff8800]",
        unActive: "font-semibold px-6 text-gray-400 py-2 cursor-pointer"
    }
    useEffect(()=>{
        if( isSuccess && products.length >0 ){
            if (infoUser.sub != products[0].id_customer)
            refetch()
        }
        if(isSuccess && products){
            const newListProduct = products.filter((item)=> item.status == select)
            setListProduct(newListProduct)
        }
    },[idProduct, infoUser.sub, isSuccess, products, refetch, select])
    useEffect(()=>{
        if(!loadingUpdateProduct)
            refetch()
    },[loadingUpdateProduct, refetch])
    useEffect(()=>{
        if(listProduct && idProduct && products) {
            setListProduct(products.filter((item)=> item._id == idProduct))
        }else{
            if(products) {
                setSelect('complete')
                const newListProduct = products.filter((item)=> item.status == 'complete')
                setListProduct(newListProduct)
            }
        }
    },[idProduct, products])
    const handleSelect = (select:string) => {
        navigate('/my-ads')
        setSelect(select)
    }
    const handleStatusProduct = async (id:string ,status: string)=>{
        try {
            await dispatch(updateStatusProduct({id,status}))
            toast.success('Cập nhật thành công')
            refetchListProduct()
        } catch (error) {
            toast.error('Cập nhật lỗi')
            console.log(error);
        }
    }
    
    return (
        <div className=" w-[950px] m-auto py-6">
            <div className="bg-white rounded shadow-md">
                <div className="py-4 flex items-center justify-between">
                    <div className=" px-4 flex items-center gap-2">
                        <div className=" w-12 h-12 rounded-full overflow-hidden">
                            <img className=" w-full h-full object-cover" src={infoUser.avata && infoUser.avata} alt="" />
                        </div>
                        <div>
                            <p className=" font-semibold"> {infoUser.username && infoUser.username} </p>
                        </div>
                    </div>
                    <div className=" px-5">
                        <div className="flex items-center px-4 bg-gray-200 py-2 rounded gap-3">
                            <p className=" font-semibold ">Số dư: { wallet && formatCurrency(wallet.current_amount)} </p>
                            <Link to={`/wallet`} className=" bg-green-600 hover:bg-green-500 p-1 rounded-md text-white font-semibold"><IoAddOutline /></Link>
                        </div>
                    </div>
                </div>
                <div className=" border-t">
                    <div className=" flex gap-1 uppercase text-xs">
                        <p
                            onClick={() => handleSelect('complete')}
                            className={select == 'complete' ? classSelect.active : classSelect.unActive} >
                            Đang hiển thị
                        </p>
                        <p
                            onClick={() => handleSelect('expired')}
                            className={select == 'expired' ? classSelect.active : classSelect.unActive}>
                            Hết hạn
                        </p>
                        <p
                            onClick={() => handleSelect('hidden')}
                            className={select == 'hidden' ? classSelect.active : classSelect.unActive}>
                            Đã ẩn
                        </p>
                    </div>
                </div>
            </div>

            <div className=" py-4 flex flex-col gap-2">
                {listProduct ?
                listProduct.map((item)=>{
                    return <ListMyProduct key={item._id} product={item} onHandleStatusProduct={handleStatusProduct} />
                }) :
                    <></>
                }
            </div>
        </div>
    )
}

export default ManagementProduct