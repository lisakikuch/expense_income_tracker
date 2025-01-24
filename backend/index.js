const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://127.0.0.1:27017/expenseTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR.")
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Expense/income Tracker!')
})

app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`APP IS LISTENING TO PORT ${PORT}!`)
})