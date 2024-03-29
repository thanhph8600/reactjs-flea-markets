import { Navigate, Outlet } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GetInfoUser } from '../hook/admin/contexts/info';
import { getToken } from '../util';
import { LoaderContex } from '../hook/admin/contexts/loader';

export const AdminPrivateRouter = () => {
    const [infoUser, setInfoUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);
    const token = getToken('access_token');
    useEffect(() => {
        if(token) {
            const getInfo = async () => {
                const res = await GetInfoUser();
                setInfoUser(res);
                setLoading(false); 
            };
            getInfo();
        }else {
            setLoading(false);
            setInfoUser(defaultUser);
        }
    }, [token]);
    
    const { setLoader } = useContext(LoaderContex);
    if (loading) {
        setLoader(true)
        return ;
    }
    setLoader(false)
    return infoUser.role == 'admin' ? <Outlet /> : <Navigate to="/admin/login" />;
}
export const AdminPubliceRouter = () => {
    const [infoUser, setInfoUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);
    const token = getToken('access_token');
    useEffect(() => {
        if(token) {
            const getInfo = async () => {
                const res = await GetInfoUser();
                setInfoUser(res);
                setLoading(false);
            };
            getInfo();
        }else {
            setLoading(false);
            setInfoUser(defaultUser);
        }
    }, [token]);
    
    const { setLoader } = useContext(LoaderContex);
    if (loading) {
        setLoader(true)
        return ;
    }
    setLoader(false)
    return (infoUser.role != 'admin' ? <Outlet /> : <Navigate to="/admin" />)
}

const defaultUser = {
    username: '',
    phone: '',
    role: '',
    sub: '',
}