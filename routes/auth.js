var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var config = require('../config/index');
var User = require('../models/user');

router.post('/signup', function (req, res, next) {

  var newUser = new User({
    username: req.body.username,
    avatar_url: req.body.avatar_url,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    country: req.body.country,
    password: bcrypt.hashSync(req.body.password, 16),
    email: req.body.email
  });

  User.create(newUser)
  .then(function(user) {
    return res.status(201).json({
      msg: 'New user created',
      data: user
    });
  })
  .catch(function(err){
    res.status(500).json({
      msg: 'An error occured.',
      error: err
    })
  });

});

router.post('/signin', function (req, res, next) {

  User.findOne({ email: req.body.email })
    .then( function(user){
      //Compare password hash
      if (!bcrypt.compareSync(req.body.password, user.password)){
        //Error: User not found
        //I'm returning the same status so I don't give any hints to malicious users
        return res.status(500).json({
          msg: 'An error occured.',
          error: err
        })
      }
      //Signing a new token
      var tkn = jwt.sign({ user: user}, config.secret, {expiresIn: 7200})
        res.status(200).json({
          msg: 'User logged in',
          token: tkn,
          userId: user._id,
          username: user.username,
          avatar: user.avatar_url
        })
    })
    .catch(function(err){
      res.status(500).json({
        msg: 'An error occured.',
        error: err
      })
    })
})


module.exports = router;
