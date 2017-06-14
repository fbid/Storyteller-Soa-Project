var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.post('/signup', function (req, res, next) {
  console.log('Req body',req.body);

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

  console.log(' New user: ' + newUser);

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

module.exports = router;
