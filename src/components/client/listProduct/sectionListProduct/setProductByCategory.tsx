/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { useGetProductByIdCategoryQuery } from "../../../../redux/rtkQuery/productQuery"
import { defaultValueSelectAddress, district, province, typeAddressInProduct, TypeProduct, typeValueSelectAddress, ward } from "../../../../util";
import SectionListProduct from "./listProduct"
import { getNameDistrictById, getNameProvinceById, getNameWardById } from "../../../../redux/features/address";

const SetProductByCategory = ({ idCate, fillterAddress, filterPrice }: {
  idCate: string, filterPrice: { min: number; max: number; }
  fillterAddress: typeValueSelectAddress
}) => {
  const { data: products, isLoading, isSuccess, isFetching } = useGetProductByIdCategoryQuery(idCate)
  const [listProduct, setListProduct] = useState([] as TypeProduct[])
  useEffect(() => {
    if (isSuccess && products) {
      setListProduct(handleProductByFillterAddress(products, fillterAddress, filterPrice))
    }
  }, [fillterAddress, filterPrice, isSuccess, products])
  
  return (
    <>
      {listProduct && <SectionListProduct fillterAddress={fillterAddress} products={listProduct} isLoading={isLoading} isSuccess={isSuccess} isFetching={isFetching} />}
    </>
  )
}

export const handleProductByFillterAddress = (
  products: TypeProduct[],
  fillterAddress: typeValueSelectAddress,
  filterPrice: { min: number, max: number }
) => {

  let ListProduct = products
  if (fillterAddress.title == 'tỉnh thành') {
    if (fillterAddress.province._id != '') 
      ListProduct = products.filter((item) => item.address.idProvince == fillterAddress.province._id)
  }

  if (fillterAddress.title == 'quận huyện')
    ListProduct = products.filter((item) => item.address.idDistrict == fillterAddress.district._id)

  if (fillterAddress.title == 'xã phường')
    ListProduct = products.filter((item) => item.address.idWard == fillterAddress.ward._id)


  if(filterPrice.max){
    ListProduct = ListProduct.filter((item) => item.price >= filterPrice.min && item.price <= filterPrice.max)
  }
  
  return ListProduct;
}
export const handleShowAddressByFillterAddress = (
  address: typeAddressInProduct,
  fillterAddress: typeValueSelectAddress = defaultValueSelectAddress,
  province: province[],
  district: district[],
  ward: ward[]
) => {

  if (fillterAddress.title == 'tỉnh thành') {
    if (fillterAddress.province._id == '') return getNameProvinceById(address.idProvince,province)
    return getNameDistrictById(address.idDistrict, district)
  }
  if (fillterAddress.title == 'quận huyện') {
    return getNameWardById(address.idWard, ward)
  }
  if (fillterAddress.title == 'xã phường') {
    return address.address
  }
  return 'Việt Nam';
}

export default SetProductByCategory