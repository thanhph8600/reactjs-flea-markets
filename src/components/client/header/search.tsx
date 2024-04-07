import { useState } from "react"
import { IoSearch } from "react-icons/io5"
import ItemSearch from "./itemSearch"
import { Link } from "react-router-dom"

const SearchHeader = () => {
    const [showSearch, setShowSearech] = useState(false)
    const [valueSearch, setValueSearch] = useState('')
    
    const handleValueSearch = (value: string) => {
        setValueSearch(value)
    }
    const handleShowSearch = () =>{
        setShowSearech(!showSearch)
    }
    return (
        <>
            <div className=" mx-10">
                <label
                    htmlFor="default"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        onFocus={()=> setShowSearech(true)}
                        onChange={(e)=>handleValueSearch(e.target.value)}
                        type="text"
                        id="default"
                        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none "
                        placeholder="Tìm kiếm sản phẩm"
                        required
                    />
                    <Link to={`${valueSearch}`} onClick={handleShowSearch} className="text-white absolute end-2.5 bottom-1 bg-[#FF8800]  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 ">
                        <IoSearch />
                    </Link>
                    {showSearch && <ItemSearch valueSearch={valueSearch} onHandleShowSearch={handleShowSearch} />}
                </div>
            </div>
        </>
    )
}

export default SearchHeader