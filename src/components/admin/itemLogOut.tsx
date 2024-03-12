import { Link } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
const Logout = () => {
    return(
        <>
        <div className=" absolute -bottom-[86px] w-44 border rounded-md bg-white shadow-md right-0">
                    <div>
                        <p className="p-2 cursor-pointer hover:text-green-500 flex gap-2 items-center">
                            <Link to='detail-admin'>Quản lý tài khoản</Link><GrUserSettings />
                        </p>
                        <p className="p-2 cursor-pointer hover:text-green-500 flex gap-2 items-center">Đăng xuất <FaSignOutAlt /></p>
                    </div>
                </div>
        </>
    )
}
export default Logout