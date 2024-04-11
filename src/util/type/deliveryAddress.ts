export type deliveryAddress = {
    _id:string,
    id_customer: string[],
    name: string;
    phone: string;
    email: string;
    address: {
        idProvince: string,
        idDistrict: string,
        idWard: string,
        address: string,
    },
    isDefault: boolean;
}