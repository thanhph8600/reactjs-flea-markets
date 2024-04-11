import { Line } from 'react-chartjs-2';
import { formatTime, history } from '../../../util';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const highlightedRange = {
    type: 'box',
    drawTime: 'beforeDatasetsDraw',
    xScaleID: 'x-axis-0',
    yScaleID: 'y-axis-0',
    xMin: '1', // Đặt giá trị xMin và xMax cho dải nổi bật
    xMax: '2',
    backgroundColor: 'rgba(255, 0, 0, 0.1)', // Màu nền của dải nổi bật
    borderColor: 'red', // Màu viền của dải nổi bật
    borderWidth: 2, // Độ rộng của viền
  };
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Biểu đồ thống kê giá giao động ',
        },
    },
    annotation: {
        annotations: [highlightedRange], // Thêm dải nổi bật vào biểu đồ
      },
};

const ChartWallet = ({ history }: { history: history[] }) => {
    // Chuẩn bị dữ liệu cho biểu đồ
    const sortedHistory = [...history].sort((a, b) => {
        return a.created_at < b.created_at ? -1 : a.created_at > b.created_at ? 1 : 0;
    });
    const color = sortedHistory.map((_item, index)=>{
        if(index>0){
            if(sortedHistory[index].current_amount > sortedHistory[index-1].current_amount){
                return 'green'
            }
        }
        return 'red'
    })
    
    const chartData = {
        labels: [ 0,...sortedHistory.map(item => formatTime(item.created_at))], 
        datasets: [
            {
                label: 'Dòng tiền',
                data: [0, ...sortedHistory.map(item => item.current_amount)],
                borderColor: 'green',
                fill: false,
            },
        ],
    };

    return (
        <div className=' pt-5'>
            <Line options={options} data={chartData} />
        </div>
    );
};

export default ChartWallet;