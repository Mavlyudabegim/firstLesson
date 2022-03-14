const express = require('express');
const accountRouter = require('./routes/account');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expenses');
const app = express();
app.use('/accounts', accountRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expenseRouter);
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/view', (req, res) => {
  res.render('index', { test: 'Home Page' });
});
app.listen(3000);
