import { useContext, useState } from "react"
import Logout from "./itemLogOut"
import { infoUserContext } from "../../hook/admin/contexts"

const Header = () => {
    const [isShow, SetIsShow] = useState(false)
    const { infoUser } = useContext(infoUserContext)
    
    return (
        <div className="p-2 border rounded-md shadow-lg flex justify-between">
            <h2></h2>
            <div className="px-4 relative flex items-center gap-2">
                <p className=" text-base font-semibold" >{infoUser.username}</p>
                <img  onClick={()=>SetIsShow(!isShow)} className="w-12 h-12 rounded-full object-cover border cursor-pointer" src="https://www.vlance.vn/uploads/portfolio/view/c4a875224357fa0f1dce59defcb7a42b3d6d2cab1.jpg" alt="" />
                {isShow ? <Logout /> : null}                
            </div>
        </div>
    )
}

export default Header