import { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdRemoveCircle } from "react-icons/md";
import requestApi from "../../../helper/api";

const SelectImage = ({onHandleFile, onHandlePrevImages, prevImages, listFile}: {
    onHandleFile: (files:File[])=> void
    onHandlePrevImages: (value: {preview: string}[]) => void
    prevImages: {preview: string}[]
    listFile: File[]
}) => {
    const [errorFile, setErrorFile] = useState('')
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        
        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
            if(listFile.length > 6) {
                setErrorFile('Tối đa 6 ảnh');
                return;
            }
            const imageFilesArray: {preview: string}[] = imageFiles.map(file => ({
                preview: URL.createObjectURL(file) // Tạo URL để xem trước ảnh
            }))
            onHandlePrevImages([...prevImages, ...imageFilesArray])
            setErrorFile('');
            onHandleFile([...listFile, imageFiles[0]])
        }
    };
    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    const deleteFile = (index: number) => {
        const newArrShow = prevImages.filter((item,i)=> i !== index)
        const newArrFile = listFile.filter((item,i)=> i !== index)
        onHandlePrevImages(newArrShow)     
        onHandleFile(newArrFile)
    }
    const handleUpload = () => {
        const formData = new FormData();
        listFile.forEach((image: File) => {
            formData.append('files', image); 
        });
        
        requestApi('upload/arr-files','POST', formData, 'multipart/form-data' )
        .then(response => {
          // Xử lý phản hồi từ máy chủ
          console.log(response.data);
        })
        .catch(error => {
          // Xử lý lỗi
          console.error('Error uploading files: ', error);
        });
      };
    return (
        <>
            <h4 className=" text-base font-semibold">Hình ảnh sản phẩm</h4>
            <p className=" text-base pt-3 text-red-500">{errorFile}</p>
            <div className=" py-4">
                {listFile.length == 0 &&
                    <div
                        onClick={() => { handleClick() }}
                        className="bg-gray-50 w-72 text-center px-4 rounded flex flex-col items-center justify-center cursor-pointer border-2 border-gray-400 border-dashed mx-auto font-[sans-serif]">
                        <div className="py-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 mb-2 fill-gray-600 inline-block" viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            <h4 className="text-base font-semibold text-gray-600">Grag and drop files here</h4>
                        </div>
                        <hr className="w-full border-gray-400 my-2" />
                        <div className="py-6">
                            <input
                                className="hidden"
                                id="uploadFile1"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={inputRef}
                            />
                            <label htmlFor=""
                                className="block px-6 py-2.5 rounded text-gray-600 text-sm tracking-wider font-semibold border-none outline-none bg-gray-200 hover:bg-gray-100">Browse Files</label>
                            <p className="text-xs text-gray-400 mt-4">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                        </div>
                    </div>
                }
                <div>
                    {listFile.length > 0 &&
                        <div className=" flex gap-2 flex-wrap">
                            <div onClick={() => { handleClick() }} className=" flex items-center justify-center text-3xl text-[#ff8800] cursor-pointer w-32 h-32 border border-dashed rounded-md border-[#ff8800]">
                            <input
                                className="hidden"
                                id="uploadFile1"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                ref={inputRef}
                            />
                            <p><IoMdAdd /></p>
                            </div>
                        {prevImages.map((image, index) => (
                            <div key={index} className=" relative">
                                <img className=" border rounded object-cover w-32 h-32" src={image.preview} />
                                <div onClick={()=>deleteFile(index)} className=" absolute -top-2 -right-2 text-xl cursor-pointer">
                                    <MdRemoveCircle />
                                </div>
                                {index == 0 &&
                                    <div className=" text-center absolute bottom-0 left-0 w-full bg-black opacity-70 text-white">
                                    <p>Ảnh bìa</p>
                                </div>
                                }
                            </div>
                        ))}
                    </div>
                    }
                </div>
                <button onClick={()=>handleUpload()}>upload</button>
            </div>
        </>
    )
}

export default SelectImage