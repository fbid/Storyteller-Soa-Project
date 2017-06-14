var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');

router.post('/', function (req, res, next) {
  var newUser = new User(
    req.body.username,
    req.body.firstName,
    req.body.lastname,
    req.body.city,
    req.body.country,
    bcrypt.hashSync(req.body.bcrypt.password, 16),
    req.body.email
  );

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
