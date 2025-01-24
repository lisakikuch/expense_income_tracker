import React from 'react';
import TransactionTable from './TransactionTable';
import MonthSelector from './MonthSelector';
import StatusTable from './StatusTable';
import PieChart from './PieChart';

const TransactionList = ({ loading, error, month, setMonth, filteredTransactions }) => {
    return (
        <div>
            <div>
                <h2>Transactions</h2>
                <MonthSelector month={month} onChange={setMonth} />
                {loading && <p>Loading transactions...</p>}
                {error && <p>No transactions found.</p>}
            </div>

            <div>
                <TransactionTable
                    filteredTransactions={filteredTransactions.expenseTransactions}
                    type="Expense"
                />
                <PieChart data={filteredTransactions.expensePercentages} />
                <StatusTable data={filteredTransactions.expenseCategorySumArray} />
                {filteredTransactions.incomeTransactions.length > 0 && <p>Total: ${filteredTransactions.totalExpenseAmount}</p>}
            </div>

            <div>
                <TransactionTable
                    filteredTransactions={filteredTransactions.incomeTransactions}
                    type="Income"
                />
                <PieChart data={filteredTransactions.incomePercentages} />
                <StatusTable data={filteredTransactions.incomeCategorySumArray} />
                {filteredTransactions.incomeTransactions.length > 0 && <p>Total: ${filteredTransactions.totalIncomeAmount}</p>}
            </div>
        </div>
    );
};

export default TransactionList;