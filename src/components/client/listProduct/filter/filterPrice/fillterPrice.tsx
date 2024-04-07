import { useState } from "react";

const FillterPrice = ({ onChange, error, filterPrice }: { 
    onChange: (min: number, max: number) => void , 
    error:string, filterPrice: { min: number; max: number;}
}) => {
    const [minValue, setMinValue] = useState(filterPrice.min|0);
    const [maxValue, setMaxValue] = useState(filterPrice.max|30000000);
    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setMinValue(value);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setMaxValue(value);
    };

    return (
        <div className=" bg-white p-4 shadow-2xl rounded-md border">
            <p className=" text-red-500 pb-2"> {error}</p>
            <div className=" flex gap-4 items-center">
                <div>
                    <label htmlFor="min">Giá tối thiểu:</label>
                    <input
                        className="border rounded py-3 px-2 outline-none w-40"
                        type="number"
                        id="min"
                        value={minValue}
                        onChange={handleMinChange}
                    />
                </div>
                <div>
                    <label htmlFor="max">Giá tối đa:</label>
                    <input
                        className="border rounded py-3 px-2 outline-none w-40"
                        type="number"
                        id="max"
                        value={maxValue}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
            <div className="flex gap-4 pt-4">
                        <button onClick={() =>{ onChange(0, 0) }} className="w-1/2 py-2 rounded-md border font-semibold hover:bg-gray-100">Hủy bỏ</button>
                        <button onClick={() =>{ onChange(minValue, maxValue) }} className="w-1/2 py-2 rounded-md font-semibold text-white bg-[#ff8800] ">Áp dụng</button>
                </div>
        </div>
    )
}

export default FillterPrice