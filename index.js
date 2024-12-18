const express = require('express');
const connectToDatabase = require('./config/db');
connectToDatabase();
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/auth');

app.use(express.json());


app.use('/api', router);

app.get('/', (req, res) => {
    res.json({"message": "Hello World"});
});


app.listen(PORT, () => {
    console.log('Localhost is running http://localhost:' + PORT);
});
