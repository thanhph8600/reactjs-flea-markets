import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoIosCloseCircle, IoIosSend, IoMdAdd } from "react-icons/io";
import requestApi from "../../../../helper/api";

const InputSendMessenger = ({ onSendMess }: {
    onSendMess:  ( value: { messenger:string }|{ thumbnail:string })  => void
}) => {
    const [messenger, setMessenger] = useState('')
    const [checkMess, setCheckMess] = useState('')

    const inputRef = useRef<HTMLInputElement>(null);
    const [prevImages, setPrevImages] = useState([] as { preview: string }[])
    const [listFile, setListFile] = useState<File[]>([])

    const handleMessenger = (value: string) => {
        setMessenger(value)
    }
    const onSubmitMess = async () => {
        if (messenger === '' && prevImages.length == 0) {
            setCheckMess('border-red-500');
            return;
        }
        if( listFile.length >0) {
            const formData = new FormData();
            listFile.forEach((image: File) => {
                formData.append('files', image);
            });
            setListFile([])
            setPrevImages([])
            const fileName = await requestApi('upload/arr-files', 'POST', formData, 'multipart/form-data')
            console.log(fileName);
            fileName.data.fileNames.map((item:string)=>{
                sendMess({thumbnail: item})
            })
        }

        if (messenger)
            sendMess({messenger})
        setCheckMess('');
        setMessenger('')
    }
    const sendMess = (value: {messenger:string}|{ thumbnail:string }) => {
        onSendMess(value)
    }

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

            const imageFilesArray: { preview: string }[] = imageFiles.map(file => ({
                preview: URL.createObjectURL(file) // Tạo URL để xem trước ảnh
            }))
            handlePrevImages([...prevImages, ...imageFilesArray])
            handleFile([...listFile, imageFiles[0]])
        }
    };
    const handleFile = (files: File[]) => {
        setListFile(files)
    }
    const handlePrevImages = (value: { preview: string }[]) => {
        setPrevImages(value)
    }
    const deleteFile = (index: number) => {
        const newArrShow = prevImages.filter((item, i) => i !== index)
        const newArrFile = listFile.filter((item, i) => i !== index)
        handlePrevImages(newArrShow)
        handleFile(newArrFile)
    }
    return (
        <div className=" flex gap-4 items-center px-3">
            {prevImages.length == 0 && <div className=" relative text-2xl">
                <p onClick={() => handleClick()} className=" cursor-pointer"><CiImageOn /></p>
            </div>}
            <input
                className="hidden"
                id="uploadFile1"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                ref={inputRef}
            />
            <div className={`w-full text-sm border rounded-md px-2 py-1  ${checkMess}`}>
                <input
                    onChange={(e) =>
                        handleMessenger(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            onSubmitMess();
                        }
                    }}
                    value={messenger}
                    type="text"
                    className={`outline-none w-full `}
                />
                {prevImages.length > 0 && <div className=" flex gap-2 pt-3">
                    <div onClick={() => { handleClick() }} className=" flex items-center justify-center text-3xl text-[#ff8800] cursor-pointer w-16 h-16 border border-dashed rounded-md border-[#ff8800]">
                        <p><IoMdAdd /></p>
                    </div>
                    {prevImages.map((image, index) => (
                        <div key={index} className=" relative ">
                            <img className=" border rounded object-cover w-16 h-16" src={image.preview} />
                            <div onClick={() => deleteFile(index)} className=" absolute -top-2 -right-2 text-xl cursor-pointer">
                                <IoIosCloseCircle />
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <div onClick={() => onSubmitMess()} className={` hover:text-gray-600 text-2xl cursor-pointer`}>
                <IoIosSend /></div>

        </div>
    )
}

export default InputSendMessenger