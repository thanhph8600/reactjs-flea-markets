import { FaAngleRight, FaChevronDown } from "react-icons/fa";
import { PiListFill } from "react-icons/pi";
import { Category, CategoryDetail, defaultValueCategoryDetail } from "../../../util";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { categoryContext } from "../../../hook/admin/contexts/categories";

const CategoryComponentHeader = () => {
    const { listCategory, getListCategoryDetailBySlug } =
        useContext(categoryContext);
    const [arrCategoryDetail, setArrCategoryDetail] = useState([
        defaultValueCategoryDetail,
    ]);
    const [showCategoryDetail, setShowCategoryDetail] = useState(false);
    const handleCategory = (e: string) => {
        if (e.length > 2) {
            setArrCategoryDetail(getListCategoryDetailBySlug(e));
        }
        setShowCategoryDetail(true);
    };
    const elementCate = useRef({} as HTMLDivElement)
    const handleShow = () => {
        elementCate.current.className = ' hidden absolute z-20 pt-5'
        setTimeout(() => {
            elementCate.current.className = 'group-hover:block hidden absolute z-20 pt-5'
        }, 100);
    }
    return (
        <div className=" relative group cursor-pointer">
            <h2 className="flex gap-2 items-center">
                <PiListFill /> Danh mục <FaChevronDown />
            </h2>
            <div ref={elementCate} className="group-hover:block hidden absolute z-20 pt-5">
                <div className=" bg-white w-[320px] shadow-md rounded-md overflow-hidden">
                    {listCategory.map((item: Category, index) => {
                        return (
                            <Link
                                to={`/${item.link}`}
                                key={index}
                                className=" group cursor-pointer"
                                onClick={() => handleShow()}
                            >
                                <div
                                    onMouseEnter={() => handleCategory(item.link)}
                                    onMouseLeave={() => handleCategory("")}
                                    className="py-2  border-b px-2 flex items-center gap-2 hover:bg-gray-100"
                                >
                                    <div>
                                        <img className="w-10" src={item.thumbnail} alt="" />
                                    </div>
                                    <p> {item.name} </p>
                                    <p className="ml-auto text-sm">
                                        <FaAngleRight />
                                    </p>
                                </div>
                                <div className=" top-0 absolute h-screen left-full z-20 pt-5">
                                    {showCategoryDetail && (
                                        <div className=" w-[320px] h-screen bg-white  border rounded-r-md shadow overflow-hidden">
                                            {arrCategoryDetail.map(
                                                (categoryDetail: CategoryDetail) => {
                                                    return (
                                                        <Link
                                                            to={`/${categoryDetail.link}`}
                                                            key={categoryDetail._id}
                                                            className="py-2  border-b px-2 flex items-center gap-2 hover:bg-gray-100"
                                                        >
                                                            <div>
                                                                <img
                                                                    className="w-10 h-10 object-cover"
                                                                    src={categoryDetail.thumbnail}
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <p> {categoryDetail.name} </p>
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default CategoryComponentHeader