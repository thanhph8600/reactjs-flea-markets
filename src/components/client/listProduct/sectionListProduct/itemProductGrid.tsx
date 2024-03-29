import { CiLocationOn } from "react-icons/ci"
import { Link } from "react-router-dom"

const ItemProductGrid = () => {
    return (
        <Link to={`/detail-product/123`} className=" hover:shadow-xl p-3 border-b cursor-pointer">
            <div className=" w-full h-40">
                <img className=" object-cover w-full border h-40" src="https://images.autofun.vn/file1/87653b83f38f44518ae12022e7d9ffcf_800.jpg " alt="" />
            </div>
            <div className="py-2">
                <p className=" text-sm truncate">Siêu xe SH đời mới 2022, màu xanh là cây, trùm đầu</p>
                <p className=" text-base text-red-600 font-semibold">52.000.000</p>
            </div>
            <div>
                <p className=" text-gray-500 text-xs flex gap-1"><CiLocationOn /> Hà Nội</p>
            </div>
        </Link>
    )
}

export default ItemProductGrid