import { createContext, useEffect, useState } from "react";
import { Category, CategoryDetail, defaultValueCategory, defaultValueCategoryDetail, defaultValueSpecification, Specification } from "../../../util";
import requestApi from "../../../helper/api";

// eslint-disable-next-line react-refresh/only-export-components
export const categoryContext = createContext({} as {
    listCategory: Category[], 
    listCategoryDetail: CategoryDetail[]
    setListCategory: React.Dispatch<React.SetStateAction<Category[]>>,
    callAPI: () => void,
    getListCategoryDetailBySlug: (slug:string) => CategoryDetail[],
    getCategoryBySlug: (slug:string) => Category,
    specification: Specification[],
    getSpecification: () => void,
    getCategoryDetailBySlug: (slug:string) => CategoryDetail,
} )

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
    const [listCategory, setListCategory] = useState([defaultValueCategory])
    const [listCategoryDetail, setListCategoryDetail] = useState([defaultValueCategoryDetail])
    const [specification, setSpecification] = useState([defaultValueSpecification])
    const callAPI = async () => {
        const dataCategory = await GetListCategory()
        const dataCategoryDetail = await GetListCategoryDetail()
        setListCategory(dataCategory)
        setListCategoryDetail(dataCategoryDetail)
    }
    const getListCategoryDetailBySlug = (slug:string) => {
        const idCategory = listCategory.find(item => item.link === slug)?._id
        const data = listCategoryDetail.filter(item => item.id_category === idCategory)
        return data
    }
    const getCategoryDetailBySlug = (slug:string) => {
        const data = listCategoryDetail.find(item => item.link === slug)
        if (data){
            return data
        }else {
            return defaultValueCategoryDetail
        }
    }
    const getCategoryBySlug = (slug:string) => {
        const category = listCategory.find(item => item.link === slug)
        if (category) {
            return category
        }else {
            return defaultValueCategory
        }
    }
    const getSpecification = async () => {
        const data = await GetSpecification()
        setSpecification(data)
    }
    useEffect(() => {
        callAPI()
        getSpecification()
    }, [])
    return (
        <categoryContext.Provider value={{ 
            listCategory, 
            listCategoryDetail,
            setListCategory, 
            callAPI, 
            getListCategoryDetailBySlug, 
            getCategoryBySlug,
            specification,
            getSpecification,
            getCategoryDetailBySlug
            }}>
                {children}
        </categoryContext.Provider>
    )
}
export const GetListCategory = async () => {
    const res = await requestApi('category', 'GET', {})
    return res.data
}
export const GetListCategoryDetail = async () => {
    const res = await requestApi('detail-category', 'GET', {})
    return res.data
}
export const GetSpecification = async () => {
    const res = await requestApi('specification', 'GET', {})
    return res.data
}
export default CategoryProvider