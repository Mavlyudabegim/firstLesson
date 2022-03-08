require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const launch = async () => {
  try {
    app.listen(PORT, () => {
      console.log('PORT ', PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

launch();
