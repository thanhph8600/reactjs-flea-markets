import { CiLocationOn } from "react-icons/ci"
import '../../../assets/slide.css'
import { useState } from "react"
import { formatCurrency, InterDataFormProduct, TypeProductUpdate } from "../../../util"
import { getAddress, SelectDataDistrict, SelectDataWard } from "../../../redux/features/address"
import { useAppSelector } from "../../../redux/hook"


const DemoProduct = ({ product }: {
    product: InterDataFormProduct | TypeProductUpdate
}) => {
    const { address, title, price, description, specifications, thumbnail } = product
    const [currentIndex, setCurrentIndex] = useState(0);
    const district = useAppSelector(SelectDataDistrict)
    const ward = useAppSelector(SelectDataWard)
    const goToPrevSlide = () => {
        const index = (currentIndex - 1 + thumbnail.length) % thumbnail.length;
        setCurrentIndex(index);
    };

    const goToNextSlide = () => {
        const index = (currentIndex + 1) % thumbnail.length;
        setCurrentIndex(index);
    };
    return (
        <div className=" bg-white p-4 rounded-md ">
            <div className="slide-container">
                <div className="slide">
                    {thumbnail.map((image, index) => (
                        <div
                            key={index}
                            className={index === currentIndex ? 'slide-img active' : 'slide-img'}
                        >
                            <img src={image} className=" m-auto h-[350px] object-contain" alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                    <button className="prev" onClick={goToPrevSlide}>
                        &#10094;
                    </button>
                    <button className="next" onClick={goToNextSlide}>
                        &#10095;
                    </button>
                </div>
            </div>

            <div className=" py-2 flex flex-col gap-2">
                <h2 className=" text-lg font-semibold"> {title} </h2>
                <p className=" text-red-500 font-semibold">{ formatCurrency(price) }</p>
                <h4 className=" text-base font-semibold">Mô tả sản phẩm</h4>
                <p className=" text-sm">{description}</p>
            </div>

            <h4 className=" text-base font-semibold pt-4">Thông số kỹ thuật</h4>
            <div className=" grid grid-cols-2 gap-4 text-sm pt-2 pb-4">
                {specifications && Object.keys(specifications).map((key, index) => {
                    return <div key={index}>
                        {key}: {specifications[key]}
                    </div>
                })}
            </div>
            <div>
                <h2 className=" font-semibold text-gray-500 py-2 border-b mb-2">Khu vực</h2>
                <div className=" flex items-center gap-2">
                    <p className=" text-xl"><CiLocationOn /></p>
                    <p className=" text-sm"> {getAddress(address,district,ward)} </p>
                </div>
            </div>
        </div>
    )
}

export default DemoProduct