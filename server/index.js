require('dotenv').config();
const express = require('express');
const accountRouter = require('./routes/account');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expenses');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/accounts', accountRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expenseRouter);
app.use('/category', categoryRouter);
app.use('/', userRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

module.exports = app;
