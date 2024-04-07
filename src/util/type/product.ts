import { Category, CategoryDetail } from "./category";
import { User } from "./user";

interface ValueSpecification {
    [key: string]: string;
}
export interface InterDataFormProduct {
    id_customer: string,
    id_category: string;
    id_category_detail: string;
    title: string,
    price: number,
    description: string,
    specifications: ValueSpecification,
    address: {
        idProvince: string,
        idDistrict: string,
        idWard: string,
        address: string,
    },
    thumbnail: Array<string>,
    created_at: Date
    end_at: Date
}

export interface TypeProduct {
    _id:string,
    id_customer: string,
    id_category: string;
    id_category_detail: string;
    title: string,
    price: number,
    selling_price: number,
    description: string,
    specifications: ValueSpecification,
    address: {
        idProvince: string,
        idDistrict: string,
        idWard: string,
        address: string,
    },
    thumbnail: Array<string>,
    status: string,
    created_at: Date
    end_at: Date
}

export const defaultValueProduct = {
    _id: '',
    id_customer: '',
    id_category: '',
    id_category_detail: '',
    title: '',
    price: 0,
    selling_price: 0,
    description: '',
    specifications: {},
    address: {
        idProvince:  '',
        idDistrict: '',
        idWard: '',
        address: '',
    },
    thumbnail: [''],
    status: ''
}


export interface TypeProductUpdate {
    _id:string,
    id_customer: User[],
    id_category: Category[];
    id_category_detail: CategoryDetail[];
    title: string,
    price: number,
    selling_price: number,
    description: string,
    specifications: ValueSpecification,
    address: {
        idProvince: string,
        idDistrict: string,
        idWard: string,
        address: string,
    },
    thumbnail: Array<string>,
    status: string,
    created_at: Date
    end_at: Date
}