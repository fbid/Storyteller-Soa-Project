var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.post('/', function (req, res, next) {

  Post.create(req.body)
    .then(function(post) {
      res.status(201).json({
        msg: 'Post correctly stored.',
        data: post
      });
    })
    .catch(function(err){
      res.status(404).json({
        msg: 'An error occured.',
        error: err
      })
      next(err);
    });

});

module.exports = router;
