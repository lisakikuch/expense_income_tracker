const mongoose = require('mongoose');
const Transaction = require('./models/transactions');

mongoose.connect('mongodb://127.0.0.1:27017/expenseTracker')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR.")
        console.log(err)
    })

const seedTransactions = [
    {
        amount: 550,
        type: 'Expense',
        category: 'Rent',
        month: 'Jan'
    },
    {
        amount: 128.15,
        type: 'Expense',
        category: 'Transport',
        month: 'Jan'
    },
    {
        amount: 32.77,
        type: 'Expense',
        category: 'Tel',
        month: 'Feb'
    },
    {
        amount: 500,
        type: 'Income',
        category: 'Salary',
        month: 'Feb'
    }
]

Transaction.insertMany(seedTransactions)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })