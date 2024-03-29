import { createContext, useContext, useEffect, useState } from "react";
import { User, defaultValueUser } from "../../../util";
import requestApi from "../../../helper/api";
import { infoUserContext } from "./info";

// eslint-disable-next-line react-refresh/only-export-components
export const listUserContext = createContext({} as { listUser: User[], setListUser: React.Dispatch<React.SetStateAction<User[]>> });

const ListUserProvider = ({ children }: { children: React.ReactNode }) => {
    const [listUser, setListUser] = useState([defaultValueUser])
    const { infoUser } = useContext(infoUserContext)
    useEffect(() => {
        if(infoUser.role === 'admin') {
                const effectListUser = async () => {
                    const data = await GetListUser()
                    setListUser(data)
                }
                effectListUser()
            }
    },[infoUser] )
    return (
        <listUserContext.Provider value={{ listUser, setListUser }}>
            {children}
        </listUserContext.Provider>
    )
}
export const GetListUser = async () => {
    const res = await requestApi('customer', 'GET', {})
    return res.data
}
export default ListUserProvider
