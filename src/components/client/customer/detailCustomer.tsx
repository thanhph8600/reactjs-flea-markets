import SidebarCustomer from "./sidebar"

const DetailCustomer = () => {
  return (
    <>
        <div className=" w-[950px] m-auto py-8"> 
            <div className="flex gap-4">
                <div className="w-1/3">
                    <SidebarCustomer />
                </div>

                <div className="w-2/3">
                    <div className=" bg-white border shadow-md rounded-md p-4">
                        <div className=" flex">
                            <div className=" text-center w-full">
                                <p>Đang hiển thị</p>
                            </div>
                            <div className=" text-center w-full">
                                <p>Đã bán</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default DetailCustomer