var express = require('express');
var router = express.Router();

var Post = require('../models/post');

router.post('/', function (req, res, next) {
  Post.create(req.body)
    .then( post => {
      res.send(post);
    })
    .catch(next);
});

module.exports = router;
