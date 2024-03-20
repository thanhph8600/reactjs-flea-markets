import { useContext} from "react"
import { User } from "../../../util"
import ItemUser from "./itemUser"
import { listUserContext } from "../../../hook/admin/contexts/listUser"

const ListUser = () => {
    // const [listUser, setListUser] = useState([])
    const {listUser} = useContext(listUserContext)
    return (
        <div className="border p-4 rounded-md shadow-lg">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">name</th>
                                        <th scope="col" className="px-6 py-4">phone</th>
                                        <th scope="col" className="px-6 py-4">email</th>
                                        <th scope="col" className="px-6 py-4">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listUser.map((item: User, index) => {
                                        return <ItemUser key={index} {...item} />
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUser