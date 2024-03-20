import { createContext, useEffect, useState } from "react";
import { Category, defaultValueCategory } from "../../../util";
import requestApi from "../../../helper/api";

// eslint-disable-next-line react-refresh/only-export-components
export const categoryContext = createContext({} as {
    listCategory: Category[], 
    setListCategory: React.Dispatch<React.SetStateAction<Category[]>>,
    callAPI: () => void
} )

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [listCategory, setListCategory] = useState([defaultValueCategory])
    const callAPI = async () => {
        const data = await GetListCategory()
        setListCategory(data)
    }
    useEffect(() => {
        callAPI()
    }, [])
    return (
        <categoryContext.Provider value={{ listCategory, setListCategory, callAPI }}>
            {children}
        </categoryContext.Provider>
    )
}
export const GetListCategory = async () => {
    const res = await requestApi('category', 'GET', {})
    return res.data
}
export default CategoryProvider