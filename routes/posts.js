var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.get('/', function (req, res, next) {

  Post.find({})
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

module.exports = router;
