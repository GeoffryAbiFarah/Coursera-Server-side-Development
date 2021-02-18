const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const authenticate = require('./authenticate')


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leadersRouter = require('./routes/leadersRouter');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true ,
                                                useUnifiedTopology: true,
                                                useCreateIndex:true});

connect
    .then((db) => {
      console.log("Connected correctly to server !")
    })
    .catch((err) => {
      console.log(err);
    });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//=====================================================================
// Session AUTH
//=====================================================================
const auth = (req, res, next) => {
    if(!req.user){
        const err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
    }
    else{
        next();
    }
}

app.use(auth);


//=====================================================================
// Cookies AUTH
//=====================================================================

// const auth = (req, res, next) => {
//     console.log(req.signedCookies);
//
//     if(!req.signedCookies.user){
//         // if there is no cookies for the user, we ask for basic auth
//         const authHeader = req.headers.authorization;
//
//         if (!authHeader){
//             const err = new Error('You are not authenticated!');
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             return next(err);
//         }
//
//         const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
//             .toString()
//             .split(':');
//
//         const username = auth[0];
//         const password = auth[1];
//
//         if (username === 'admin' && password === 'password'){
//             res.cookie('user', 'admin', {signed: true});
//             next();
//         }
//         else{
//             const err = new Error('You are not authenticated!');
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             return next(err);
//         }
//     }
//     else{
//         //the signed cookie exists
//         if (req.signedCookies.user === 'admin'){
//             next();
//         }
//         else{
//             const err = new Error('You are not authenticated!');
//             err.status = 401;
//             return next(err);
//         }
//     }
// }
//
// app.use(auth);

//=====================================================================
// Basic AUTH
//=====================================================================

// const auth = (req, res, next) => {
//     console.log(req.headers);
//
//     const authHeader = req.headers.authorization;
//
//     if (!authHeader){
//         const err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 401;
//         return next(err);
//     }
//
//     const auth = Buffer.from(authHeader.split(' ')[1], 'base64')
//         .toString()
//         .split(':');
//
//     const username = auth[0];
//     const password = auth[1];
//
//     if (username === 'admin' && password === 'password'){
//         next();
//     }
//     else{
//         const err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');
//         err.status = 401;
//         return next(err);
//     }
// }

// app.use(auth);
//=====================================================================

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promo', promoRouter);
app.use('/leaders', leadersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
