const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactions');

// Show all transactions or filter by month if specified
router.get('/', async (req, res) => {
    const { month } = req.query;

    try {
        const query = month ? { month } : {};
        const transactions = await Transaction.find(query);

        if (transactions.length === 0 && month) {
            return res.status(404).json({ message: `No transactions found for ${month}.` });
        }

        res.json(transactions)
    } catch (err) {
        console.error("Error fetching transaction: ", err)
        res.status(500).json({ message: "Internal Server Error." })
    }
})

router.get('/monthly', async (req, res) => {
    const { month } = req.query;

    try {
        const query = month ? { month } : {};
        const transactions = await Transaction.find(query);

        if (transactions.length === 0 && month) {
            return res.status(404).json({ message: `No transactions found for ${month}.` });
        }

        res.json(transactions)
    } catch (err) {
        console.error("Error fetching transaction: ", err)
        res.status(500).json({ message: "Internal Server Error." })
    }
})

// Show summaries of each month
router.get('/summaries', async (req, res) => {

})

// Add a new transaction
router.post('/', async (req, res) => {
    const { amount, category, type, month, memo } = req.body;
    // const amount = req.body.amount
    // ...

    try {
        if (!amount || !category || !type || !month) {
            return res
                .status(400)
                .json({ message: "Required fields need to be filled." });
        }

        const newTransaction = new Transaction({
            amount, category, type, month, memo
        })
        await newTransaction.save();
        res.json(newTransaction);
    } catch (err) {
        console.error("Error saving transaction:", err);
        res.status(500).json({ message: "Internal Server Error." })
    }

})

// Show a specific transaction by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transaction = await Transaction.findById(id);
        res.json(transaction)
    } catch (err) {
        console.error("Error fetching a transaction with ID: ", err)
        res.status(500).json({ message: "Internal Server Error." })
    }
})

// Edit a transaction
router.put('/:id/', async (req, res) => {
    const { id } = req.params;

    try {
        const editTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
        if (!editTransaction) {
            return res.status(404).json({ message: "Transaction not edited." });
        }
        res.status(200).json({ message: "Transaction edited successfully!" });
    } catch (err) {
        console.error("Error editing transaction: ", err);
        res.status(500).json({ message: "Internal Server Error." })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deleteTransaction = await Transaction.findByIdAndDelete(id);
        if (!deleteTransaction) {
            return res.status(404).json({ message: "Transaction not deleted." });
        }
        res.status(200).json({ message: "Transaction deleted successfully!" });
    } catch (err) {
        console.error("Error deleting transaction: ", err);
        res.status(500).json({ message: "Internal Server Error." })
    }
})

module.exports = router;