require('dotenv').config();
const app = require('./index');

const mongoose = require('mongoose');
const express = require('express');
const mongoURl = `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;
app.use(express.json());

async function startApp() {
  try {
    await mongoose.connect(mongoURl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log('PORT ', PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
