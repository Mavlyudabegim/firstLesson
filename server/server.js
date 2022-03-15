require('dotenv');
const express = require('express');
const accountRouter = require('./routes/account');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expenses');
const { createServer } = require('http');

const mongoose = require('mongoose');
const res = require('express/lib/response');
const mongoURl = `mongodb+srv://mekhrullaeva1999:Adulvam28.07@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURl, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected');
  })
  .catch((er) => {
    console.log(er);
  });

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
const server = createServer(app);
server.listen(process.env.PORT);
