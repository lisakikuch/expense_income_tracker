import { useState } from "react";

const AddTransaction = () => {
    // const [type, setType] = useState("");
    // const [amount, setAmount] = useState("");
    // const [category, setCategory] = useState("");
    // const [month, setMonth] = useState("");
    // const [memo, setMemo] = useState("")
    const [formData, setFormData] = useState({
        type: "",
        amount: "",
        category: "",
        month: "",
        memo: ""
    }); // new

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        // const name = e.target.name;
        // const value = e.target.value
        setFormData((prev) => ({ ...prev, [name]: value }))
    } // new

    const handleSubmit = async (e) => {
        setError(""); // new: clear previous errors

        const { type, amount, category, month } = formData; // new

        if (!type || !amount || !category || !month) {
            setError("Please fill in all required fields.");
            e.preventDefault();
            return;
        } // new: validate required fields

        try {
            const response = await fetch('http://localhost:3001/transactions', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData), // new
                // body: JSON.stringify({ type, amount, category, month, memo }),
            });
            // const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add the transaction.");
            }
            // alert("Added Successfully!")
            // setType("");
            // setAmount("");
            // setCategory("");
            // setMonth("");
            // setMemo("");
            // } else {
            //     alert(data.message || "Failed to add transaction")
            // }

            alert("Transaction added successfully!");
            setFormData({ type: "", amount: "", category: "", month: "", memo: "" }) // new

        } catch (err) {
            console.error("Error adding the transaction: ", err);
            setError(err.message || "Something went wrong! Please try again"); // new
        }
    }

    return (
        <div>
            <h2>Add a New Transaction</h2>
            {<p>{error}</p>} {/* new */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">Type * </label>
                <select
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}>
                    {/* onChange={(e) => setType(e.target.value)}> */}{/* new */}
                    <option value=""></option>
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                </select>
                <br />

                <label htmlFor="amount">Amount * </label>
                <input
                    type="number"
                    value={formData.amount}
                    id="amount"
                    name="amount"
                    onChange={handleChange}
                />
                <br />

                <label htmlFor="category">Category * </label>
                <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    <option value="">--- Expense ---</option>
                    <option value="Daily">Daily</option>
                    <option value="Tel">Tel</option>
                    <option value="Transport">Transport</option>
                    <option value="Rent">Rent</option>
                    <option value="Eat-out">Eat-out</option>
                    <option value="Medical">Medical</option>
                    <option value="Education">Education</option>
                    <option value="Others">Others</option>
                    <option value="">--- Income ---</option>
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
                    value={formData.month}
                    onChange={handleChange}
                >
                    <option value=""></option>
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
                    value={formData.memo}
                    onChange={handleChange}
                />
                <br />

                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTransaction;