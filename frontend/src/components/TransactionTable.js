import React from "react";
import { Link } from 'react-router-dom';

const TransactionTable = ({ filteredTransactions, type }) => {
    return (
        <>
            <h3>{type}</h3>
            {filteredTransactions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Month</th>
                            <th>Memo</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.type}</td>
                                <td>${transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.month}</td>
                                <td>{transaction.memo || ""}</td>
                                <td><Link to={`/transactions/${transaction._id}`}>■</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No {type.toLowerCase()} transactins found.</p>
            )}
        </>
    );
};

export default TransactionTable;