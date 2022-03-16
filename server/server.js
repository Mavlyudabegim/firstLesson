require('dotenv').config();
const express = require('express');
const accountRouter = require('./routes/account');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expenses');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const mongoose = require('mongoose');
const mongoURl = `mongodb+srv://mekhrullaeva1999:Adulvam28.07@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const app = express();
app.use('/accounts', accountRouter);
app.use('/income', incomeRouter);
app.use('/expenses', expenseRouter);
app.use('/category', categoryRouter);
app.use('/', userRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/view', (req, res) => {
  res.render('index', { test: 'Home Page' });
});

async function startApp() {
  try {
    await mongoose.connect(mongoURl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(3000, () => {
      console.log('PORT ', 3000);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
