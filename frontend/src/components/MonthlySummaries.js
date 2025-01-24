import React from "react";
import BarChart from "./BarChart";

const MonthlySummary = ({ monthlyTotals }) => {
    const monthlySummaryArray = monthlyTotals.map(({ month, income, expense }) => ({
        month,
        income: income.toFixed(2),
        expense: expense.toFixed(2),
        difference: (income - expense).toFixed(2),
    }));

    return (
        <div>
            <h2>Monthly Summaries</h2>
            {monthlySummaryArray.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Expense</th>
                            <th>Income</th>
                            <th>Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {monthlySummaryArray.map(({ month, expense, income, difference }) => (
                            <tr key={month}>
                                <td>{month}</td>
                                <td>${expense}</td>
                                <td>${income}</td>
                                <td>${difference}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p></p>
            )}
            <div>
                <BarChart monthlyTotals={monthlyTotals} />
            </div>
        </div>
    )
};

export default MonthlySummary;