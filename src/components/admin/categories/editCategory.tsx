import { ChangeEvent, useState } from "react";
import { Category } from "../../../util";
const EditCategory = ({ value, onHandlePopup, onHandleFrom, onSubmid,errorForm}: {
    value: Category, 
    onHandlePopup: () => void,
    onHandleFrom: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmid: () => void;
    errorForm: string;
}) => {
    const [showImage, setShowImage] = useState('');  
    return (
        <>
            <div className="bg-white w-[500px] py-8 px-10 rounded-md shadow-lg relative">
                <button onClick={() => { onHandlePopup() }} className="absolute top-4 right-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <h1 className="text-2xl font-semibold">Category</h1>
                <p className=" text-red-500 pt-1">{errorForm}</p>
                <div className="mt-4">
                    <label className="block mb-2">Name</label>
                    <input type="text" onChange={(e)=>{onHandleFrom(e)}} name="name" className="w-full border border-gray-300 rounded-md p-2" value={value.name} />
                </div>
                <div className="mt-4">
                    <label className="block mb-2">Thumbnail</label>
                    <input type="text" onChange={(e)=>{
                        onHandleFrom(e)
                        setShowImage(e.target.value)
                    }
                    } name="thumbnail" className="w-full border border-gray-300 rounded-md p-2" value={value.thumbnail} />
                </div>
                <div className=" py-3 max-h-44">
                    <img className=" object-cover  max-h-44 h-full rounded-md" src={showImage || value.thumbnail} alt="" />
                </div>
                <div className="mt-4">
                    <button onClick={onSubmid} className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
                </div>
            </div>
        </>
    )
}
export default EditCategory