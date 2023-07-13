const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/items.js');
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("./client/build"))

app.use('/api/items', itemRoutes);

app.get("*",(req,res)=> {
  res.redirect("/")
  // res.sendFile("client/build/index.html",{root:__dirname})
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect('mongodb+srv://thoufeek:rF6S0f7LG9CnXYRT@cluster0.qiuvhd8.mongodb.net/crud?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));