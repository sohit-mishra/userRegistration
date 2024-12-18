const express = require('express');
const connectToDatabase = require('./config/db');
connectToDatabase();
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const auth = require('./routes/auth');
const category = require('./routes/category');

app.use(express.json());


app.use('/api', auth);
app.use('/category', category);

app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
});


app.listen(PORT, () => {
    console.log('Localhost is running http://localhost:' + PORT);
});
