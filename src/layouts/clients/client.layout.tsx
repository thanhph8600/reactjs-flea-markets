import { Outlet } from "react-router-dom"

const ClientLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="w-1/6">
                    Sdile
                </div>
                <div className="w-5/6">
                    <div>
                        <div className="px-4 py-2">
                            Header
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
export default ClientLayout