import { Link } from 'react-router-dom'
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers,FaListUl  } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoGitCompareSharp } from 'react-icons/io5';
const Sidebar = () => {
    return (
        <div className="p-4 border-2 shadow-lg h-screen fixed top-0 left-0 text-gray-700"  >
            <div>
                <div className='pb-10'>
                    <img className='w-[120px] h-[120px] border shadow m-auto rounded-full object-cover' src="https://tranhtomaudep.com/wp-content/uploads/2023/09/to-mau-khung-canh-cho-ben-thanh.jpg" alt="" />
                </div>
                <div className="flex flex-col gap-6 w-48 m-auto">
                    <Link to='/admin/' className='  font-semibold hover:text-gray-900 flex gap-2 items-center'>Dashboard <MdDashboard /></Link>
                    <Link to="/admin/khach-hang" className='  font-semibold hover:text-gray-900 flex gap-2 items-center'>Khách hàng <FaUsers /> </Link>
                    <Link to="/admin/danh-muc" className='  font-semibold hover:text-gray-900 flex gap-2 items-center'>Danh mục <BiSolidCategory /> </Link>
                    <Link to="/admin/thong-so-ky-thuat" className='  font-semibold hover:text-gray-900 flex gap-2 items-center'>Thông số kỹ thuật <IoGitCompareSharp /> </Link>
                    <Link to="/admin/san-pham" className='  font-semibold hover:text-gray-900 flex gap-2 items-center'>Sản phẩm <FaListUl /> </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar