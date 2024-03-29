import Sidebar from "../../components/admin/sidebar.admin.component"
import Header from "../../components/admin/header.admin.component"
import { Outlet } from "react-router-dom"

const AdminLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="w-1/6">
                    <Sidebar />
                </div>
                <div className="w-5/6">
                    <div>
                        <div className="px-4 py-2">
                            <Header />
                        </div>
                        <div className="px-4 py-2">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminLayout