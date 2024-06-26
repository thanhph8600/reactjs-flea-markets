import { useContext, useState } from "react"
import { CategoryDetail } from "../../../../util"
import { categoryContext } from "../../../../hook/admin/contexts/categories"

interface ValueSpecification {
    [key: string]: string;
}
const SelectSpecification = ({categoryDetail, valueSpecification, onHandleSpecification}: {
    categoryDetail: CategoryDetail,
    valueSpecification: ValueSpecification
    onHandleSpecification: (key: string, value: string) => void
}) => {
    const { specification } = useContext(categoryContext)
    const [activeInput, setActiveInput] = useState('');
    const handleFocus = (id: string) => {
        if (id) setActiveInput(id);
    };

    return (
        <div className=" py-2">
            <div className=" py-2">
                <h3 className=" text-base font-semibold custom-config">Thông tin chi tiết</h3>
            </div>
            <div className=" py-2 flex flex-col gap-4">
                {categoryDetail.specification.map((idSpec, index) => {
                    const itemSpec = specification.find((x) => x._id == idSpec)
                    if(itemSpec) {
                        return (
                            <div key={index} className=" relative ">
                                <input
                                    onFocus={() => handleFocus(itemSpec._id)}
                                    onBlur={() => setTimeout(() => {
                                        setActiveInput('')
                                    }, 300)}
                                    value={typeof itemSpec?.name === 'string' ? valueSpecification[itemSpec?.name] || '' : ''}
                                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                    placeholder=" " />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"> {itemSpec?.name}
                                </label>
                                <div style={activeInput === itemSpec?._id ? {} : { display: 'none' }} className=" max-h-[200px] overflow-y-auto z-10 absolute top-full left-0 rounded-md border shadow-md bg-white w-full text-gray-600">
                                    {itemSpec?.value.map((valueSpec, index) => {
                                        return (<p key={index} onClick={() => {
                                            onHandleSpecification(itemSpec.name, valueSpec)
                                            setActiveInput('')
                                        }} className=" py-2 hover:bg-gray-100 cursor-pointer px-4"> {valueSpec} </p>)
                                    })}
                                </div>
                            </div>
                        )
                    }

                })}
            </div>
        </div>
    )
}

export default SelectSpecification