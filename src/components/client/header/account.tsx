import { useContext, useState } from "react"
import { FaChevronDown, FaRegUserCircle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { infoUserContext } from "../../../hook/admin/contexts"
import { removeToken } from "../../../util"
import { toast } from "react-toastify"
import { defaultUser } from "../../../hook/admin/contexts/info"

const AccountComponentHeader = () => {
    const [showPopup, setShowPopup] = useState(false)
    const { infoUser, setInfoUser } = useContext(infoUserContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        removeToken('access_token')
        removeToken('refresh_token')
        navigate("/", { replace: true })
        setInfoUser(defaultUser)
        setShowPopup(false)
        toast.info("Đã đăng xuất!");
    }
    return (
        <>
            <div className=" relative">
                <div  onClick={() => setShowPopup(!showPopup)}  className="hover:text-yellow-100  cursor-pointer flex gap-1 items-center ">
                    <FaRegUserCircle />
                    <div className="text-base flex items-center gap-1">
                        <span className="text-base"> {infoUser.username || 'Tài khoản'} </span>
                        <FaChevronDown />
                    </div>
                </div>
                {showPopup && <div className=" absolute top-full right-0  w-[250px] pt-5 z-10">
                    <div className=" bg-white border shadow-md rounded-md text-base">
                        {!infoUser.username ? <div className=" flex justify-evenly p-2  font-semibold" >
                            <Link onClick={() => setShowPopup(!showPopup)} className=" hover:text-yellow-600" to={'/login'} >Đăng nhập</Link>
                            <p>/</p>
                            <Link onClick={() => setShowPopup(!showPopup)} className=" hover:text-yellow-600" to={'/register'} >Đăng ký</Link>
                        </div> :
                            <div className="">
                                <Link onClick={() => setShowPopup(!showPopup)}  to={`/customer/${infoUser.sub}`} className=" flex gap-2 p-2">
                                    <div className=" w-10 h-10">
                                        <img src="https://cdn.chotot.com/uac2/26681637" className=" w-full object-cover rounded-full" alt="" />
                                    </div>
                                    <div className=" w-full">
                                        <h2 className=" font-semibold border-b"> {infoUser.username} </h2>
                                        <div className="flex justify-between text-xs py-2">
                                            <p>0 người theo dõi</p>
                                            <p>|</p>
                                            <p>0 đang theo dõi</p>
                                        </div>
                                    </div>
                                </Link>
                                <p className=" text-center text-sm border-y">
                                    <Link onClick={() => setShowPopup(!showPopup)} to={`/wallet`} className=" py-2 block font-semibold hover:bg-gray-100">Ví của tôi</Link>
                                </p>
                                <div className="">
                                    <button onClick={()=> handleLogout()} className=" text-center w-full border-t py-2 font-semibold  hover:bg-gray-100">Đăng xuất</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>}
            </div>
        </>
    )
}

export default AccountComponentHeader