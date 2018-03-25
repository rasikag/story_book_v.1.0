const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// load user model
require('./models/User');

// passport config 
require('./config/passport')(passport);

// load routes
const auth = require('./routes/auth');

//load keys
const keys = require('./config/keys');
// Map global promise
mongoose.Promise = global.Promise;
// connect mongoose 
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

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