import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const TransactionChart = () => {
    const chartData = {
        labels: ["Saving", "Expense", "Investment"],
        datasets: [
            {
                label: "%",
                data: [13, 8, 3],
                backgroundColor: ["#7480ff", "#ff52d9", "rgba(54, 162, 235)"],
                borderColor: ["#7480ff", "#ff52d9", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
                borderRadius: 30,
                spacing: 10,
                cutout: 130,
            },
        ],
    };

    ChartJS.register(ArcElement, Tooltip, Legend);

    return <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
        <Doughnut data={chartData} className="tranasction-chart" />
    </div>
};

export default TransactionChart;