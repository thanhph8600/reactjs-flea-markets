import { useState } from "react"
import { InterDataFormProduct } from "../../../../util"

const SelectTitleAndDescription = ({ onHandleForm, validateFormTitle, validateFormDescription, errorForm, dataForm }: {
    onHandleForm: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
    validateFormTitle: (title: string) => string
    validateFormDescription: (description: string) => string
    errorForm: { title: string; description: string;price:string; }
    dataForm: InterDataFormProduct
}) => {
    const [showNoteTitle, setShowNoteTitle] = useState(false)
    return (
        <>
            <div className=" pb-2">
                <h3 className=" text-base font-semibold">Tiêu đề tin đăng và Mô tả chi tiết</h3>
            </div>
            <div className="  text-sm relative">
                <input
                    onBlur={() => setShowNoteTitle(false)}
                    onFocus={() => setShowNoteTitle(true)}
                    onChange={(e) => { validateFormTitle(e.target.value), onHandleForm(e) }}
                    value={dataForm?.title}
                    type="text" name="title"
                    className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" " />
                <label
                    className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"> Tiêu đề tin đăng <span className=" text-red-500"> * </span>
                </label>
                <p className=" text-red-500 text-xs py-0.5"> {errorForm.title} </p>
                <p className=" text-gray-500 text-xs"> {dataForm.title ? dataForm.title.length : '0'} / 50 kí tự </p>
                <div className=" my-2">
                    {showNoteTitle && <div className=" bg-blue-100 rounded-md p-2 text-xs ">
                        <span className=" font-semibold  text-white bg-blue-600 p-1 rounded-lg">Tiêu đề tốt nên có</span>
                        <div className=" flex flex-col gap-1 pt-2">
                            <p>Loại sản phẩm + Thương hiệu + Model + kích thước + tình trạng </p>
                            <p>Ví dụ:</p>
                            <p>- Apple Ipad gen 6 32GB đủ màu mới 100%</p>
                            <p>- Xiaomi Redmi K30 Pro 8GB/128GB Xanh nước biển mới 97%</p>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="py-2 relative">
                <textarea
                    onChange={(e) => { validateFormDescription(e.target.value), onHandleForm(e) }}
                    value={dataForm?.description}
                    name="description"
                    className="peer h-full min-h-[200px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder="
      Nên viết các thông tin nổi bật:
      - Giống động vật, Xuất xứ
      - Tháng tuổi, Cân nặng, Màu sắc
      - Tiêm ngừa và khai sinh, ...
      - Chính sách bảo hành, đổi trả vật nuôi
      - Địa chỉ giao nhận, đổi trả vật nuôi"></textarea>
                <label
                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                </label>
                <p className=" text-red-500 text-xs py-0.5"> {errorForm.description} </p>
                <p className=" text-gray-500 text-xs"> {dataForm.description ? dataForm.description.length : '0'} / 1500 kí tự </p>

                <div className=" pt-4">
                    <div className=" relative">
                        <input
                            min={0}
                            onChange={(e) => onHandleForm(e)}
                            value={dataForm?.price}
                            type="number" name="price"
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" " />
                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"> Giá tiền <span className=" text-red-500"> * </span>
                        </label>
                        <p className=" text-red-500 text-xs py-0.5"> {errorForm.price} </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectTitleAndDescription