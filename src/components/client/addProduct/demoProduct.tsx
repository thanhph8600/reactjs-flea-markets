import { CiLocationOn } from "react-icons/ci"
import { getNameDistrictById, getNameProvinceById, getNameWardById } from "../../../redux/features/address"
import '../../../assets/slide.css'
import { useState } from "react"
import { InterDataFormProduct } from "../../../util"
const DemoProduct = ({ formDataProduct, prevImages }: {
    formDataProduct: InterDataFormProduct
    prevImages: { preview: string }[]
}) => {
    const { address, title, price, description, specifications } = formDataProduct
    const province = getNameProvinceById(address.idProvince)
    const district = getNameDistrictById(address.idDistrict)
    const ward = getNameWardById(address.idWard)

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevSlide = () => {
      const index = (currentIndex - 1 + prevImages.length) % prevImages.length;
      setCurrentIndex(index);
    };
  
    const goToNextSlide = () => {
      const index = (currentIndex + 1) % prevImages.length;
      setCurrentIndex(index);
    };
    return (
        <div className=" bg-white p-4 min-w-[700px] rounded-md ">
            <div className="slide-container">
                <div className="slide">
                    {prevImages.map((image, index) => (
                        <div
                            key={index}
                            className={index === currentIndex ? 'slide-img active' : 'slide-img'}
                        >
                            <img src={image.preview} className=" m-auto h-[350px] object-contain" alt={`Slide ${index + 1}`} />
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
                <p className=" text-red-500 font-semibold">{price}</p>
                <p className=" text-sm">{description}</p>
            </div>

            <div className=" grid grid-cols-2 gap-4 text-sm py-4">
                {Object.keys(specifications).map((key, index) => {
                    return <div key={index}>
                        {key}: {specifications[key]}
                    </div>
                })}
            </div>
            <div>
                <h2 className=" font-semibold text-gray-500 py-2 border-b mb-2">Khu vực</h2>
                <div className=" flex items-center gap-2">
                    <p className=" text-xl"><CiLocationOn /></p>
                    <p className=" text-sm"> {`${address.address}, ${ward}, ${district}, ${province}`} </p>
                </div>
            </div>
        </div>
    )
}

export default DemoProduct