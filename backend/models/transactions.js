const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: [true, "Type is required"]
    },
    category: {
        type: String,
        enum: ['Daily', 'Tel', 'Transport', 'Rent', 'Eat-out', 'Medical', 'Education', 'Others', 'Salary', 'Tips', 'Gift', 'Tax'],
        required: [true, "Category is required"]
    },
    month : {
        type: String,
        enum: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
        required: [true, "Month is required"]
    },
    memo: {
        type: String
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;