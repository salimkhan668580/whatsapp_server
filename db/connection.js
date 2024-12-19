
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://salimkhan:salim1234@cluster0.bdss8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log(' db is Connected!'))
  .catch((err) => console.error('db connection error', err));
  