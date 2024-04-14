
const ShipBuyNow = () => {
    return (
        <div className=" bg-white rounded shadow-md pt-2">
            <h4 className=" p-2 px-4 text-base font-semibold">Phương thức Giao hàng</h4>
            <div className=" p-4 flex flex-col gap-2">
                <div className=" flex items-center gap-2">
                    <input type="radio" name="ship" id="auto-ship" checked />
                    <label htmlFor="auto-ship">Tự thỏa thuận phí giao hàng</label>
                </div>
            </div>
        </div>
    )
}

export default ShipBuyNow