var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config/index');
var Post = require('../models/post');
var User = require('../models/user');

router.get('/', function (req, res, next) {

  Post.find()
    .then(function(posts) {
      return res.status(200).json(posts);
    })
    .catch(function(err){
      res.status(500).json({
        title: 'Unable to get documents.',
        error: err
      })
    });

});

router.get('/:id', function (req, res, next) {

  Post.findById(req.params.id)
    .then(function(posts) {
      return res.status(200).json(posts);
    })
    .catch(function(err){
      res.status(500).json({
        title: 'Document not found',
        error: err
      })
    });

});

//Verify the provided token before proceeding down with other routes
router.use('/', function(req, res, next) {

  var token = req.headers['x-access-token'] || req.body.token || req.query.token;

  if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.status(401).json({ title: 'Invalid token provided', error: err  });
      }
      req.decoded = decoded; //save the decoded token to request object for use in other routes
      next();
    });
  }
  else {
    return res.status(403).send({
        title: 'No token provided',
        error:{
          message: 'Please signin before submitting a story'
        }
    });
  }
});

router.post('/', function (req, res, next) {

  var decoded = jwt.decode(req.headers['x-access-token']);

  User.findById(decoded.user._id)
    .then( function(user){

      //Replace user related info
      req.body.userId = user._id;
      req.body.author = user.username;

      //Submit the story
      Post.create(req.body)
        .then(function(post) {
          return res.status(201).json({
            title: 'Item correctly stored.',
            data: post
          });
        })
        .catch(function(err){
          res.status(500).json({
            title: 'Unable to save the document',
            error: err
          })
        });
    })
    .catch(function(err){

      res.status(500).json({
        title: 'User not found',
        error: err
      })
    });


});

router.patch('/:id', function (req, res, next) {

  var decoded = jwt.decode(req.headers['x-access-token']);

  Post.findById(req.params.id)
    .catch(function(err){
      res.status(500).json({
        title: 'Post ' + req.params.id + ' not found',
        error: err
      })
    })
    .then(function(post){

      if(decoded.user._id === post.userId){

        //Replace editable info
        post.title = req.body.title;
        post.mainImg = req.body.mainImg;
        post.content = req.body.content;
        post.tags = req.body.tags;

        post.save()
          .then(function(post) {
            return res.status(200).json({
              title: 'Post updated correctly.',
              data: post
            });
          })
          .catch(function(err){
            res.status(500).json({
              title: 'Unable to update the document.',
              error: err
            })
          });
      }
      else {
        return res.status(401).json({
          title: 'You are not authorized to edit this post.',
          error: err
        })
      }
    });

})

router.delete('/:id', function(req, res, next) {

  var decoded = jwt.decode(req.headers['x-access-token']);

  Post.findById(req.params.id)
    .then( function(post){

      //Check if the userId stored in the token is equal to the post one
      if(decoded.user._id === post.userId){

        //Remove post from db
        Post.remove({'_id': req.params.id})
          .then( function(){
            res.status(200).json({
              title: 'Post correctly deleted'
            })
          })
          .catch(function(err){
            res.status(500).json({
              title: 'Unable to delete post with id: ' + req.params.id,
              error: err
            })
          });
        }
    })
})



module.exports = router;
