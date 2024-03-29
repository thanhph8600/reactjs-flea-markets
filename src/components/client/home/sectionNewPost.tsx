import { useEffect, useState } from "react"
import ItemSectionNewPost from "../listProduct/sectionListProduct/itemProductGrid"

const SectionNewPost = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13,12,123,123,123,1,21,121,31,41,41,121,31,12]
    const [show, setShow] = useState(false)
    const [arrShow, setArrShow] = useState(arr.slice(0, 10))
    const moreArr = () => {
        setArrShow(arr.slice(0, arrShow.length + 10))
    }
    useEffect(() => {
        if (arr.length >10){
            setShow(true)
        }
        if (arr.length === arrShow.length){
            setShow(false)
        }
    }, [arr, arrShow])
    return (
        <>
            <div className="bg-white p-4 rounded shadow ">
                <h3 className="text-base font-semibold">Tin đăng mới</h3>
                <div className=" grid grid-cols-5 py-4">
                    {arrShow.map((_item, index) => {
                        return <ItemSectionNewPost key={index} />
                    })}
                </div>
                {show && <div className="flex justify-center">
                    <button onClick={() => moreArr()} className=" px-6 bg-red-600 text-white py-2 rounded">Xem thêm</button>
                </div>}
            </div>
        </>
    )
}

export default SectionNewPost