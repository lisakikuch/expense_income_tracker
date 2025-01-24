import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TransactionDetails = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`http://localhost:3001/transactions/${id}`);
                if (!response.ok) {
                    throw new Error("Transaction not found.");
                }
                const data = await response.json();
                setTransaction(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching a transaction: ", err);
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    if (loading) {
        return <p>Loading a transaction...</p>;
    }

    if (!transaction) {
        return <p>No transaction found.</p>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransaction((prev) => ({ ...prev, [name]: value }));
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!transaction.amount || !transaction.category) {
            alert("All required fields must be filled.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/transactions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transaction),
            });
            if (response.ok) {
                const updatedTransaction = await response.json();
                setTransaction(updatedTransaction);
                alert("Transaction edited successfully!")
            } else {
                alert("Failed to edit the transaction.")
            }
        } catch (err) {
            console.error("Error editing a transaction: ", err);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/transactions/${id}`, { method: 'DELETE' });
            if (response.ok) {
                alert("Transaction deleted successfully!")
                navigate("/transactions");
            } else {
                alert("Failed to delete the transaction.")
            }
        } catch (err) {
            console.error("Error deleting a transaction: ", err);
        }
    };

    return (
        <div>
            <h2>Transaction Details</h2>
            <form onSubmit={handleEdit}>
                <label htmlFor="type">Type * </label>
                <select
                    name="type"
                    id="type"
                    value={transaction.type}
                    onChange={handleChange}>
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
                <br />

                <label htmlFor="amount">Amount * </label>
                <input
                    type="number"
                    value={transaction.amount}
                    id="amount"
                    name="amount"
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="category">Category * </label>
                <select
                    name="category"
                    id="category"
                    value={transaction.category}
                    onChange={handleChange}
                >
                    <option disabled>--- Expense ---</option>
                    <option value="Daily">Daily</option>
                    <option value="Tel">Tel</option>
                    <option value="Transport">Transport</option>
                    <option value="Rent">Rent</option>
                    <option value="Eat-out">Eat-out</option>
                    <option value="Medical">Medical</option>
                    <option value="Education">Education</option>
                    <option value="Others">Others</option>
                    <option disabled>--- Income ---</option>
                    <option value="Salary">Salary</option>
                    <option value="Tips">Tips</option>
                    <option value="Gift">Gift</option>
                    <option value="Tax">Tax</option>
                </select>
                <br />

                <label htmlFor="month">Month * </label>
                <select
                    name="month"
                    id="month"
                    value={transaction.month}
                    onChange={handleChange}
                >
                    <option value="Jan">Jan</option>
                    <option value="Feb">Feb</option>
                    <option value="Mar">Mar</option>
                    <option value="Apr">Apr</option>
                    <option value="May">May</option>
                    <option value="Jun">Jun</option>
                    <option value="Jul">Jul</option>
                    <option value="Aug">Aug</option>
                    <option value="Sep">Sep</option>
                    <option value="Oct">Oct</option>
                    <option value="Nov">Nov</option>
                    <option value="Dec">Dec</option>
                </select>
                <br />

                <label htmlFor="memo">Memo </label>
                <input
                    type="text"
                    id="memo"
                    name="memo"
                    value={transaction.memo}
                    onChange={handleChange}
                />
                <br />
                <button type="submit">Edit</button>
            </form>
            <br />
            <button onClick={handleDelete}>Delete</button>
            <br />
            <button onClick={() => navigate("/transactions")}>Home</button>
            {/* wrap the function otherwise it will be executed immediately. */}
        </div>
    );
};

export default TransactionDetails;
