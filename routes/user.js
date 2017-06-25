var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config/index');
var User = require('../models/user');
var Post = require('../models/post');

router.get('/:id', function (req, res, next) {

  var decoded = jwt.decode(req.headers['x-access-token']);

  if(decoded.user._id === req.params.id){

    User.findById(req.params.id)
      .catch(function(err){
        res.status(500).json({
          title: 'User ' + req.params.id + ' not found',
          error: err
        })
      })
      .then(function(user){
        return res.status(200).json(user);
      });
  }
});

router.get('/:id/favourites', function (req, res, next) {

  var decoded = jwt.decode(req.headers['x-access-token']);

  if(decoded.user._id === req.params.id){

    User.findById(req.params.id)
      .catch(function(err){
        res.status(500).json({
          title: 'User ' + req.params.id + ' not found',
          error: err
        })
      })
      .then(function(user){
        //Retrieve post with id in user favourites array
        Post.find({ _id: { $in: user.favouritePosts }}).exec()
          .then(function(favouritePostsArray){
            return res.status(200).json(favouritePostsArray);
          });
      });
  }
});

router.patch('/:id/favourites', function(req, res, next) {

  var decoded = jwt.decode(req.headers['x-access-token']);

  if(decoded.user._id === req.params.id){

    User.findById(req.params.id)
      .catch(function(err){
        res.status(500).json({
          title: 'User ' + req.params.id + ' not found',
          error: err
        })
      })
      .then(function(user){

        //Add post to user favourites
        user.favouritePosts.push(req.body.id);

        user.save()
          .then(function(user) {
            return res.status(200).json({
              title: 'Post correctly added to user favourites.',
              data: user
            });
          })
          .catch(function(err){
            res.status(500).json({
              title: 'Unable to update user data.',
              error: err
            });
          });
      });
    }
    else {
      return res.status(401).json({
        title: 'User Ids do not match.',
        error: err
      })
    }
});

router.delete('/:id/favourites/:postId', function(req, res, next) {
  var decoded = jwt.decode(req.headers['x-access-token']);

  if(decoded.user._id === req.params.id){

    User.findById(req.params.id)
      .catch(function(err){
        res.status(500).json({
          title: 'User ' + req.params.id + ' not found',
          error: err
        })
      })
      .then(function(user){
        var postId = req.params.postId;
        //Remove post from user favourites
        user.favouritePosts.splice(user.favouritePosts.indexOf(postId),1);

        user.save()
          .then(function(user) {
            return res.status(200).json({
              title: 'Post correctly removed from user favourites.',
              data: user
            });
          })
          .catch(function(err){
            res.status(500).json({
              title: 'Unable to update user data.',
              error: err
            });
          });
      });
    }
    else {
      return res.status(401).json({
        title: 'User Ids do not match.',
        error: err
      })
    }
})

module.exports = router;
