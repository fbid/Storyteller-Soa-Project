var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config/index');
var Post = require('../models/post');

router.get('/', function (req, res, next) {

  Post.find()
    .then(function(posts) {
      return res.status(200).json(posts);
    })
    .catch(function(err){
      res.status(500).json({
        msg: 'An error occured.',
        error: err
      })
    });

});

router.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({ success: false, msg: 'Invalid token provided' });
      }
      req.decoded = decoded; //save the decoded token to request object for use in other routes
      next();
    });
  }
  else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
});

router.post('/', function (req, res, next) {
  Post.create(req.body)
    .then(function(post) {
      return res.status(201).json({
        msg: 'Post correctly stored.',
        data: post
      });
    })
    .catch(function(err){
      res.status(500).json({
        msg: 'An error occured.',
        error: err
      })
    });

});

router.patch('/:id', function (req, res, next) {

  Post.findOne(req.params.id)
    .catch(function(err){
      res.status(500).json({
        msg: 'An error occured.',
        error: err
      })
    })
    .then(function(post){
      message.content = req.body.content;
      message.save()
        .then(function(post) {
          return res.status(200).json({
            msg: 'Post updated correctly.',
            data: post
          });
        })
        .catch(function(err){
          res.status(500).json({
            msg: 'An error occured.',
            error: err
          })
        });
    })

})

module.exports = router;
