
export function formatTimeDifference(date: Date): string {
    const postTime = new Date(date);
    const currentTime = new Date();
    // Tính thời gian chênh lệch giữa hai thời điểm (tính bằng mili giây)
    const diffInMilliseconds = currentTime.getTime() - postTime.getTime();

    // Chuyển đổi sang giây
    const diffInSeconds = diffInMilliseconds / 1000;

    if (diffInSeconds < 60) {
        return `${Math.floor(diffInSeconds)} giây trước`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} phút trước`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    } else if (diffInSeconds < 604800) {
        return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    } else {
        return `${Math.floor(diffInSeconds / 604800)} tuần trước`;
    }
}

export function formatCurrency(amount:string|number) {
    amount = Number(amount)
        let formattedAmount = amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');
        
        // Append đồng symbol
        formattedAmount += " đ";
        
        return formattedAmount;
}