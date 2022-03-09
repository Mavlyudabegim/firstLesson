require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
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
