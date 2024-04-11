
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

export function formatCurrency(amount: string | number) {
    amount = Number(amount)
    let formattedAmount = amount.toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');

    // Append đồng symbol
    formattedAmount += " đ";

    return formattedAmount;
}

export function formatTime(date: Date): string {
    const specificTime = new Date(date);
    const formattedDate = `${specificTime.getDate()}/${specificTime.getMonth() + 1}/${specificTime.getFullYear()}`;
    const formattedTime = `${specificTime.getHours()}:${specificTime.getMinutes()}:${specificTime.getSeconds()}`;
    return `${formattedDate} ${formattedTime}`;
}

export function topicCheckout(topic: string) {
    switch (topic) {
        case '1':
            return 20000;
            break;
        case '2':
            return 50000;
            break;
        case '3':
            return 100000;
            break;
        case '4':
            return 200000;
            break;
        case '5':
            return 500000;
            break;
        case '6':
            return 1000000;
            break;
        case '7':
            return 2000000;
            break;
        case '8':
            return 5000000;
            break;
        default:
            return 0;
            break;
    }
}

export const listTocpicCheckout = ['1','2','3','4','5','6', '7', '8']

export const classInputForm = 'peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] focus:border-gray-900'
export const classLableForm = "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"