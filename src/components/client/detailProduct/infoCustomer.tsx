import { Link } from "react-router-dom";
import { User } from "../../../util";

const InfoCustomer = ({customer}:{customer:User}) => {
    return (
        <div>
            <div className="flex gap-2 py-4">
                <div className=" w-20">
                    <img className=" m-auto object-cover w-12 h-12 rounded-full border " src={customer.avata} alt="" />
                </div>
                <div className=" w-full">
                    <div className=" w-full flex justify-between items-center">
                        <div>
                            <p className=" text-sm font-semibold"> {customer.name} </p>
                        </div>
                        <div>
                            <Link to={`/customer/${customer._id}`} className=" px-4 py-1 border rounded-md text-xs">Xem trang</Link>
                        </div>
                    </div>
                </div>
            </div>
            
 
        </div>
    )
}

export default InfoCustomer