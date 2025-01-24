import React, { useEffect, useState, useCallback } from "react";
import TransactionList from "./TransactionList";
import MonthlySummary from "./MonthlySummaries";

const TransactionManager = () => {
    // const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [month, setMonth] = useState("");
    const [filteredTransactions, setFilteredTransactions] = useState({
        expenseTransactions: [],
        incomeTransactions: [],
        totalExpenseAmount: "",
        totalIncomeAmount: "",
        expenseCategorySumArray: [],
        incomeCategorySumArray: [],
        expensePercentages: [],
        incomePercentages: [],
    });
    const [monthlyTotals, setMonthlyTotals] = useState([]);

    const filterTransactions = (transactions, type) => {
        const transactionsByType = transactions.filter(
            (transaction) => transaction.type === type
        );

        const totalAmountByType = transactionsByType.reduce(
            (total, transaction) => total + transaction.amount,
            0
        );

        const categorySumByType = transactionsByType.reduce(
            (total, transaction) => {
                const { category, amount } = transaction;
                // const category = transaction.category;
                // const amount = transaction.amount;
                if (!total[category]) {
                    total[category] = 0;
                }
                total[category] += amount;
                return total;
            }, {} //Initial value
        );
        // Example Output: { transport: 125, eat-out: 35, daily: 80 }

        const categorySumArray = Object.entries(categorySumByType).map(([category, amount]) => ({
            category,
            amount: amount.toFixed(2),
        }));

        const categoryPercentages = Object.entries(categorySumByType).map(([category, amount]) => ({
            category,
            percentage: ((amount / totalAmountByType) * 100).toFixed(2),
            // Object.entries(categorySumByType) -> [ ["transport", 125], ["eat-out", 35], ["daily", 50] ]
        }));
        // Example Output: [{ category: "transport", percentage: "50" }, { category: "eat-out", percentage: "25" }, { category: "daily", percentage: "10.25" }]

        return {
            transactionsByType,
            totalAmountByType: totalAmountByType.toFixed(2),
            categorySumByType,
            categorySumArray,
            categoryPercentages,
        };
    };

    const updateTransactions = useCallback((transactions) => {
        // Object Destructuring with renaming
        const { transactionsByType: expenses,
            totalAmountByType: expenseTotal,
            categorySumArray: expenseCategorySumArray,
            categoryPercentages: expensePercentages,
        } =
            filterTransactions(transactions, "Expense");

        const { transactionsByType: incomes,
            totalAmountByType: incomeTotal,
            categorySumArray: incomeCategorySumArray,
            categoryPercentages: incomePercentages
        } =
            filterTransactions(transactions, "Income");

        console.log("Expense Category Sum Array:", expenseCategorySumArray);
        console.log("Income Category Sum Array:", incomeCategorySumArray);
        console.log("Expense Percentages:", expensePercentages);
        console.log("Income Percentages:", incomePercentages);

        const totals = transactions.reduce((total, transaction) => {
            const { month, type, amount } = transaction;

            if(!total[month]) {
                total[month] = { income: 0, expense: 0 };
            }

            if (type === "Income") {
                total[month].income += amount;
            } else if (type === "Expense") {
                total[month].expense += amount;
            }

            return total;
        }, {});

        const monthlyTotalsArray = Object.entries(totals).map(([month, { income, expense }]) => ({
            month,
            income,
            expense,
        }));

        setMonthlyTotals(monthlyTotalsArray);

        setFilteredTransactions({
            expenseTransactions: expenses,
            totalExpenseAmount: expenseTotal,
            incomeTransactions: incomes,
            totalIncomeAmount: incomeTotal,
            expenseCategorySumArray: expenseCategorySumArray,
            incomeCategorySumArray: incomeCategorySumArray,
            expensePercentages: expensePercentages,
            incomePercentages: incomePercentages,
        });
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3001/transactions${month ? `?month=${month}` : ""}`);
                if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

                const data = await response.json();
                // setTransactions(data);
                if (data.length === 0) {
                    setFilteredTransactions({
                        expenseTransactions: [],
                        incomeTransactions: [],
                        totalExpenseAmount: "",
                        totalIncomeAmount: "",
                        expenseCategorySumArray: [],
                        incomeCategorySumArray: [],
                        expensePercentages: [],
                        incomePercentages: [],
                    });
                } else {
                    updateTransactions(data);
                }
            } catch (err) {
                setError(err.message);
                // setTransactions([]);
                setFilteredTransactions({
                    expenseTransactions: [],
                    incomeTransactions: [],
                    totalExpenseAmount: "",
                    totalIncomeAmount: "",
                    expenseCategorySumArray: [],
                    incomeCategorySumArray: [],
                    expensePercentages: [],
                    incomePercentages: [],
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [month, updateTransactions]);

    return (
        <div>

            <TransactionList
                filteredTransactions={filteredTransactions}
                loading={loading}
                error={error}
                month={month}
                setMonth={setMonth}
            />

            <MonthlySummary
                monthlyTotals={monthlyTotals}
            />

        </div>
    );
};

export default TransactionManager;
