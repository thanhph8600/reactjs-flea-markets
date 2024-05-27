import DemoProduct from "./demoProduct";
import '../../../assets/slideHome.css'
import InfoSeller from "./infoSeller";
import { useGetProductByIDQuery } from "../../../redux/rtkQuery/productQuery";


const DetailProduct = ({id}:{id:string}) => {
    const { data: product, isLoading, isSuccess } = useGetProductByIDQuery(id)
    
    return (
        <div className=" md:w-[950px] w-auto m-auto py-4">
            <div className=" bg-white p-3 rounded-md shadow-md">
                <div className="md:flex gap-4 relative flex-wrap lg:flex-nowrap">
                    <div className=" md:w-2/3">
                        <div>
                            {!isLoading && isSuccess ?
                                <DemoProduct product={product} /> :
                                <div>
                                    <div className="skeleton h-[370px]  rounded-md"></div>
                                    <div className=" py-2 flex flex-col gap-2">
                                        <h2 className=" py-4 skeleton w-60  rounded-md"> </h2>
                                        <p className=" py-2 skeleton w-20 rounded-md"></p>
                                        <p className=" py-2 skeleton w-32 rounded-md" ></p>
                                        <p className=" py-2 skeleton rounded-md" ></p>
                                    </div>
                                    <p className=" mt-6 py-2 skeleton w-52 rounded-md" ></p>
                                    <div className=" grid grid-cols-2 gap-4 text-sm py-4 ">
                                        <div className="skeleton py-2  w-32 rounded-md"></div>
                                        <div className="skeleton py-2  w-32 rounded-md"></div>
                                        <div className="skeleton py-2  w-32 rounded-md"></div>
                                        <div className="skeleton py-2 w-32 rounded-md"></div>
                                    </div>
                                    <div>
                                        <h2 className=" font-semibold text-gray-500 py-2 border-b mb-2"></h2>
                                        <div className="skeleton py-2  rounded-md">
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className=" md:w-1/3 border-t pr-3 pt-4 ">
                        {!isLoading && isSuccess ?
                            <div className=" sticky top-0 left-0">
                                <InfoSeller customer={product.id_customer[0]} idProduct={product._id} />
                            </div>
                            :
                            <div>
                                <div className="flex gap-2 py-2">
                                    <div className=" w-20 ">
                                        <p className=" skeleton  m-auto object-contain w-16 h-16 rounded-full border "></p>
                                    </div>
                                    <div className=" w-full">
                                        <div className=" w-full flex justify-between items-center">
                                            <p className=" skeleton py-2"></p>
                                            <p className="skeleton px-4 py-2 border rounded-md "></p>
                                        </div>
                                        <div className="skeleton py-2  rounded-md">
                                        </div>
                                    </div>
                                </div>
                                <div className=" py-2">
                                    <div className="skeleton py-5 px-2 bg-gray-100 rounded-md flex items-center gap-1">
                                    </div>
                                </div>
                                <div className=" py-2">
                                    <div className=" flex flex-col gap-2">
                                        <div className="skeleton rounded-md py-5 "></div>
                                        <div className="skeleton border rounded-md py-5 "></div>
                                        <div className="skeleton rounded-md py-5 "></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct