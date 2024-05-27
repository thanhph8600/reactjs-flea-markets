import { useParams } from "react-router-dom"
import SidebarCustomer from "./sidebar"
import ListProduct from "./listProduct"

const DetailCustomer = () => {
    const { id } = useParams()

  return (
    <>
        <div className=" md:w-[950px] max-w-[950px] m-auto md:py-8"> 
            <div className="md:flex gap-4">
                <div className="md:w-1/3">
                    { id && <SidebarCustomer idCustomer={id} />}
                </div>

                <div className="md:w-2/3 py-4 md:py-0">
                    <div className=" bg-white border shadow-md md:rounded-md p-4">
                        <div className=" flex">
                            <div className=" font-semibold text-[#ff8800] text-center w-full">
                                <p>Đang hiển thị</p>
                            </div>
                            <div className=" text-center w-full">
                                <p>Đã bán</p>
                            </div>
                        </div>
                    </div>
                    <div className=" md:my-4 p-2 bg-white md:rounded shadow-md">
                       {id && <ListProduct idCustomer={id} />}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailCustomer