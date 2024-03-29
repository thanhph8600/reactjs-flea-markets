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
}