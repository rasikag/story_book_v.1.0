const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// passport config 
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');

const app = express();

app.get('/', (req, res)=>{
    res.send(`Server start in port ${port}`);
});

// use auth 
app.use('/auth', auth);

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server start in port: ${port}`);
});