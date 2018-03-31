const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport');

// load user model
require('./models/User');

// passport config 
require('./config/passport')(passport);

// load routes
const index = require('./routes/index');
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

// cookie parser middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());



app.use((req, res, next) => {
    res.locals.user = req.user || null;
});

// use auth 
app.use('/', index);
app.use('/auth', auth);


const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server start in port: ${port}`);
});