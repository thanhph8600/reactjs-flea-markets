import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { getToken } from "../util";
import { GetInfoUser } from "../hook/admin/contexts/info";
import { LoaderContex } from "../hook/admin/contexts/loader";

export const ClientPubliceRouter = () => {
    return <Outlet />
}

export const ClientPrivateRouter = () => {
    const { setLoader } = useContext(LoaderContex);
    const [infoUser, setInfoUser] = useState(defaultUser);
    const [isloading, setisLoading] = useState(true);
    const token = getToken('access_token');
    useEffect(() => {
        if(token) {
            const getInfo = async () => {
                const res = await GetInfoUser();
                setInfoUser(res);
                setisLoading(false);
            };
            getInfo();
        } else {
            setisLoading(false);
            setInfoUser(defaultUser);
        }
    }, [token]);

    useEffect(() => {
        if (isloading) {
            setLoader(true);
        } else {
            setLoader(false);
        }
    }, [isloading, setLoader]);
    if(isloading) {
        return false
    }
    return (infoUser.username != '' ? <Outlet /> : <Navigate to="/login" />);
}


const defaultUser = {
    username: '',
    phone: '',
    role: '',
    sub: '',
}