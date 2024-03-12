import { useState } from "react"
import { DataUser } from "../../../data/user"
import { User } from "../../../util"
import Search from "../search"
import ItemUser from "./itemUser"

const ListUser = () => {
    const [listUser, setListUser] = useState(DataUser)
    const handSearch = (e: string) => {
        setListUser(DataUser.filter((item: User) => item.name.includes(e)))
    }
    return (
        <div className="border p-4 rounded-md shadow-lg">
            <h2>List user</h2>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">name</th>
                                        <th scope="col" className="px-6 py-4">year</th>
                                        <th scope="col" className="px-6 py-4">
                                            <Search onHandSearch={handSearch} />
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