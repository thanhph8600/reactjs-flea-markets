import { useParams } from "react-router-dom"
import DemoProduct from "./demoProduct";
import '../../../assets/slideHome.css'
import InfoSeller from "./infoSeller";
import { fetchProduct, SelectLoadingProduct, SelectProduct } from '../../../redux/features/product';
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useEffect } from "react";

const DetailProduct = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const product = useAppSelector(SelectProduct)
    const loading = useAppSelector(SelectLoadingProduct)
    
    useEffect(()=>{
        if(id){
            dispatch(fetchProduct(id))
        }
    },[dispatch, id])
    
    return (
        <div className=" w-[950px] m-auto py-4">
            <div className=" bg-white p-3 rounded-md shadow-md">
                <div className="flex gap-4 relative">
                    <div className=" w-2/3">
                        <div>
                            {!loading && product._id !='' ?
                                <DemoProduct product={product} /> :
                                <div>
                                    <div className="skeleton h-[350px]  rounded-md"></div>
                                    <div className=" py-2 flex flex-col gap-2">
                                        <h2 className=" py-4 skeleton  rounded-md"> </h2>
                                        <p className=" py-2 skeleton  rounded-md"></p>
                                        <p className=" py-2 skeleton  rounded-md" ></p>
                                    </div>
                                    <div className=" grid grid-cols-2 gap-4 text-sm py-4 ">
                                        <div className="skeleton py-1  rounded-md"></div>
                                        <div className="skeleton py-1  rounded-md"></div>
                                        <div className="skeleton py-1  rounded-md"></div>
                                        <div className="skeleton py-1 rounded-md"></div>
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
                    <div className=" w-1/3 border-t pr-3 pt-4 ">
                        {!loading && product._id !=''?
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