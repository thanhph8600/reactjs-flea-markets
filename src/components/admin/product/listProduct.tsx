import { MdDelete } from "react-icons/md"
import { useGetAllProductQuery } from "../../../redux/rtkQuery/productQuery"
import { defaultValueSelectAddress } from "../../../util"
import ItemProductCol from "../../client/listProduct/sectionListProduct/itemProductCol"
import requestApi from "../../../helper/api"
import { toast } from "react-toastify"

const ListProduct = () => {
  const { data: listProduct, isLoading, isSuccess, refetch } = useGetAllProductQuery()
  const deleteProduct = (idProdct: string) => {
    requestApi(`product/${idProdct}`, 'DELETE', {})
      .then(()=>{
        refetch()
        toast.success('Xóa thành công')
      })
      .catch(()=>{
        toast.error('Xóa thất bại')
      })
  }
  return (
    <div>
      <div className="border p-4 rounded-md shadow-lg">
        <div className=" bg-white flex flex-col gap-1">
         {!isLoading && isSuccess && listProduct && 
          listProduct.map((item) => {
            return (
              <div className=" flex gap-2 items-center">
                <div className=" w-full">
                  <ItemProductCol  itemProduct={item}  fillterAddress={defaultValueSelectAddress} />
                </div>
                <div onClick={()=>deleteProduct(item._id)} className=" text-2xl text-gray-500 cursor-pointer hover:text-red-600 w-20">
                 <MdDelete />
                </div>
              </div>
            )
          })
         }
        </div>
      </div>
    </div>
  )
}

export default ListProduct