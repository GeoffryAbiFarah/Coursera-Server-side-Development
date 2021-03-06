const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

const router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/',authenticate.verifyUser, authenticate.verifyAdmin, function(req,
                         res,
                         next) {
  User.find()
      .then((users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
      }, (err) => next(err))
      .catch((err) => next(err));
});

//==========/user/signup===============
router.post('/signup', function(req, res, next){
  User.register(new User({ username: req.body.username}),
      req.body.password,
      (err, user) => {
        if (err){
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err : err});
        }
        else {
            if (req.body.firstname){
                user.firstname = req.body.firstname;
            }
            if(req.body.lastname){
                user.lastname = req.body.lastname;
            }
            user.save((err, user) => {
                if (err){
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err : err});
                    return ;
                }
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful'});
                });
            });
        }
      });
});

//==========/user/login===============
router.post('/login',
    passport.authenticate('local'),
    (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true,token: token, status: 'You are successfully logged in'});
});

//==========/user/logout===============
// "get" because we dont  provide any input we are just logging out
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    const err = new Error('You are not logged in !');
    err.status = 403; // forbidden
    next(err);
  }
});




module.exports = router;
