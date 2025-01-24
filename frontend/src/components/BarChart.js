import React from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ monthlyTotals }) => {
    if (!monthlyTotals || monthlyTotals.length === 0) {
        return <p></p>
    }

    const data = {
        labels: monthlyTotals.map((item) => item.month),
        datasets: [
            {
                label: 'Income',
                data: monthlyTotals.map((item) => item.income),
                backgroundColor: 'rgba(75, 192, 192, 0.6)'
            },
            {
                label: 'Expense',
                data: monthlyTotals.map((item) => item.expense),
                backgroundColor: 'rgba(255, 99, 132, 0.6)'
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            // title: {
            //     display: true,
            //     text: 'Monthly Income vs Expense'
            // },
        },
    };

    return <Bar data={data} options={options}/>
};

export default BarChart;