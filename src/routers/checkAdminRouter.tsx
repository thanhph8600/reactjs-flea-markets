import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetInfoUser } from '../hook/admin/contexts/info';
import { getToken } from '../util';

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
    console.log(infoUser);
    
    if (loading) {
        return <div>Loading...</div>;
    }
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
    
    if (loading) {
        return <div>Loading...</div>;
    }
    return (infoUser.role != 'admin' ? <Outlet /> : <Navigate to="/admin" />)
}

const defaultUser = {
    username: '',
    phone: '',
    role: '',
    sub: '',
}