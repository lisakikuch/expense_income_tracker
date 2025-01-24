import React from "react";

const StatusTable = ({ data = [] }) => {
    return (
        <>
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ category, amount }) => (
                            <tr key={category}>
                                <td>{category}</td>
                                <td>${amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p></p>
            )}
        </>
    )
};

export default StatusTable;