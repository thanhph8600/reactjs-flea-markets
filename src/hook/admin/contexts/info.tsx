import React, { useEffect } from "react";
import { createContext, useState } from "react";
import requestApi from "../../../helper/api";
import { getToken } from "../../../util";

// eslint-disable-next-line react-refresh/only-export-components
export const infoUserContext = createContext({} as { infoUser: User, setInfoUser: React.Dispatch<React.SetStateAction<User>> });

export const InfoUserProvider = ({ children }: { children: React.ReactNode }) => {
    const [infoUser, setInfoUser] = useState(defaultUser)
    const token = getToken('access_token')
    useEffect(() => {
        if (token) {
            console.log('get info user');
            const effectInfoUser = async () => {
                const data = await GetInfoUser()
                setInfoUser(data)
            }
            effectInfoUser()
        }
    }, [token])
    return (
        <infoUserContext.Provider value={{ infoUser, setInfoUser }}>
            {children}
        </infoUserContext.Provider>
    )
}
export const GetInfoUser = async () => {
    const res = await requestApi('auth/profile', 'GET', {})
    return res.data
}
const defaultUser = {
    username: '',
    phone: '',
    role: '',
    sub: '',
}
type User = {
    username: string,
    phone: string,
    role: string,
    sub: string,
}
