import { FaSignOutAlt } from "react-icons/fa";
import { GrUserSettings } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { removeToken } from "../../util";

const Logout = () => {
    const navigate = useNavigate()
    const onHandleLogout = () => {
        removeToken('access_token')
        removeToken('refresh_token')
        navigate("/admin/login", { replace: true })
        toast.info("Đã đăng xuất!");
    }
    return (
        <>
            <div className=" absolute -bottom-[86px] w-44 border rounded-md bg-white shadow-md right-0">
                <div>
                    <p className="p-2 cursor-pointer hover:text-green-500 flex gap-2 items-center">
                        <Link to='detail-admin'>Quản lý tài khoản</Link><GrUserSettings />
                    </p>
                    <div onClick={() => {onHandleLogout()}} className="p-2 cursor-pointer hover:text-green-500 flex gap-2 items-center">Đăng xuất <FaSignOutAlt /></div>
                </div>
            </div>
        </>
    )
}
export default Logout