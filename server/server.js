require('dotenv').config();
const app = require('./index');
const mongoose = require('mongoose');
const mongoURl = `mongodb+srv://mekhrullaeva1999:Adulvam28.07@cluster0.zeoe1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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
