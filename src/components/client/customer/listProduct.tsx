import { useGetProductByCusomterQuery } from "../../../redux/rtkQuery/productQuery"
import ItemProductGrid, { ItemProductGridLoading } from "../listProduct/sectionListProduct/itemProductGrid"

const ListProduct = ({ idCustomer }: { idCustomer: string }) => {
    const { data: products, isLoading, isSuccess } = useGetProductByCusomterQuery(idCustomer)
    return (
        <div>
            {!isLoading && isSuccess && products ?
                <div className=" grid grid-cols-3">
                    {products.map((item) => {
                        return <ItemProductGrid key={item._id} itemProduct={item} />
                    })}
                </div> :
                <ItemProductGridLoading length={6} />
            }
        </div>
    )
}

export default ListProduct