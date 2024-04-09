import { Messenger, User } from "../../../../util"
import ItemProductMess from "./itemProductMess"

const ItemMessenger = ({messenger,infoCustomer}:{messenger:Messenger,infoCustomer:User}) => {
    return (
        <>
            <div className={
                messenger.id_customer[0] == infoCustomer._id ?
                    'bg-gray-100 inline-block max-w-[60%]  mr-auto rounded-md' :
                    'inline-block max-w-[60%] ml-auto text-left bg-blue-100 rounded-md'
            }>
               {messenger.messenger &&  <div className=" p-2  text-sm">
                    <p> {messenger.messenger}  </p>
                </div>}

                {messenger.id_product[0] && 
                <ItemProductMess id_product={messenger.id_product[0]} infoCustomer={infoCustomer} />}

                {messenger.thumbnail &&
                    <div className=" w-[150px]">
                        <img className=" w-full rounded-md shadow-md h-full object-cover" src={messenger.thumbnail} alt="" />
                    </div>
                }
            </div>
            
        </>
    )
}

export default ItemMessenger