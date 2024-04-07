export type province = {
    _id: string,
    id: string,
    _name: string,
    _code: string,
}

export const defaultValueProvince = {
    _id: '',
    id: '',
    _name: '',
    _code: ''
}

export type district = {
    _id: string,
    id: string,
    _name: string,
    _prefix: string,
    _province_id: string,
}

export const defaultValueDistrict = {
    _id: '',
    id: '',
    _name: '',
    _prefix: '',
    _province_id: '',
}

export type ward = {
    _id: string,
    id: string,
    _name: string,
    _prefix: string,
    _province_id: string,
    _district_id: string,
}

export const defaultValueWard = {
    _id: '',
    id: '',
    _name: '',
    _prefix: '',
    _province_id: '',
    _district_id: '',
}

export const defaultValueSelectAddress = {
    title: 'tỉnh thành',
    province: defaultValueProvince,
    district: defaultValueDistrict,
    ward: defaultValueWard,
    address: ''
}
export type typeValueSelectAddress = {
    title: string;
    province: {
        _id: string;
        id: string;
        _name: string;
        _code: string;
    };
    district: {
        _id: string;
        id: string;
        _name: string;
        _prefix: string;
        _province_id: string;
    };
    ward: {
        _id: string;
        id: string;
        _name: string;
        _prefix: string;
        _province_id: string;
        _district_id: string;
    };
    address:string
}
export type typeAddressInProduct = {
    address: string,
    idDistrict: string,
    idProvince: string,
    idWard: string
}