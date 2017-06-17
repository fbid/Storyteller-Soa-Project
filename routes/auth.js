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
      title: 'New user created',
      data: user
    });
  })
  .catch(function(err){
    res.status(500).json({
      title: 'Unable to create a new user.',
      error: err
    })
  });

});

router.post('/signin', function (req, res, next) {

  User.findOne({ email: req.body.email })
    .then( function(user){

      if (!bcrypt.compareSync(req.body.password, user.password)){
        //Error: The hashed+salted password do not match
        //I'm returning the same status so I don't give any hint to malicious users
        return res.status(500).json({
          title: 'Invalid email or password.',
          error: err
        })
      }
      //Signing a new token
      var tkn = jwt.sign({ user: user}, config.secret, {expiresIn: 7200})
        res.status(200).json({
          title: 'User logged in',
          token: tkn,
          userId: user._id,
          username: user.username,
          avatar: user.avatar_url
        })
    })
    .catch(function(err){
      res.status(500).json({
        title: 'Invalid email or password.',
        error: err
      })
    })
})


module.exports = router;
