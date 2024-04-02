import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";

const TransactionChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "$",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
                borderRadius: 30,
                spacing: 10,
                cutout: 130,
            },
        ],
    });
    const { allTransaction } = useSelector(state => state.transaction);

    const getCategoryAmount = () => {
        const categoryMap = {};
        allTransaction.forEach((transaction) => {
            if (!categoryMap[transaction.category]) {
                categoryMap[transaction.category] = 0;
            }
            categoryMap[transaction.category] += transaction.amount;
        });
        // [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
        return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
    };

    const prepareChartData = () => {
        const categoriesAndAmount = getCategoryAmount();
        // ['saving', 'expense']
        const categories = categoriesAndAmount.map((stat) => stat.category);
        // [100, 200]
        const totalAmounts = categoriesAndAmount.map((stat) => stat.totalAmount);

        const backgroundColors = [];
        const borderColors = [];

        categories.forEach((category) => {
            if (category === "saving") {
                backgroundColors.push("rgba(75, 192, 192)");
                borderColors.push("rgba(75, 192, 192)");
            } else if (category === "expense") {
                backgroundColors.push("#ff52d9");
                borderColors.push("#ff52d9");
            } else if (category === "investment") {
                backgroundColors.push("rgba(54, 162, 235)");
                borderColors.push("rgba(54, 162, 235)");
            }
        });

        setChartData((prev) => ({
            labels: categories,
            datasets: [
                {
                    ...prev.datasets[0],
                    data: totalAmounts,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                },
            ],
        }));
    };

    useEffect(() => {
        if (allTransaction.length) {
            prepareChartData();
        }
    }, [allTransaction]);

    ChartJS.register(ArcElement, Tooltip, Legend);

    return allTransaction.length ? <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
        <Doughnut data={chartData} className="tranasction-chart" />
    </div> : <></>
};

export default TransactionChart;