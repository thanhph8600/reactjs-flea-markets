import { Outlet } from "react-router-dom"
import HeaderClient from "../../components/client/header/headerClient"
import FooterClient from "../../components/client/footerClient"

const ClientLayout = () => {
    return (
        <>
            <div>
                <HeaderClient />
            </div>
            <div className=" min-h-[90vh] bg-gray-100">
                <Outlet />
            </div>
            <div>
                <FooterClient />
            </div>
        </>
    )
}
export default ClientLayout