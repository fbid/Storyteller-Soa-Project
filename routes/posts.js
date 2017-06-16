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
        msg: 'An error occured.',
        error: err
      })
    });

});

router.get('/:id', function (req, res, next) {

  Post.findById(req.params.id)
    .then(function(post) {
      return res.status(200).json(post);
    })
    .catch(function(err){
      res.status(500).json({
        msg: 'An error occured.',
        error: err
      })
    });

});

//Check token validity before proceeding down with other routes
// router.use('/', function(req, res, next) {
//
//
//
//   if (token) {
//     jwt.verify(token, config.secret, function(err, decoded) {
//       if (err) {
//         return res.status(401).json({ success: false, msg: 'Invalid token provided' });
//       }
//       req.decoded = decoded; //save the decoded token to request object for use in other routes
//       next();
//     });
//   }
//   else {
//     return res.status(403).send({
//         success: false,
//         message: 'No token provided.'
//     });
//   }
// });

router.use('/', function (req, res, next) {

    jwt.verify(req.headers['x-access-token'], config.secret, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
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

      //Replace editable info
      post.author = req.body.username;
      post.mainImg = req.body.mainImg;
      post.content = req.body.content;
      post.tags = req.body.tags;

      post.save()
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
              msg: 'Post correctly deleted'
            })
          })
          .catch(function(err){
            res.status(500).json({
              msg: 'An error occured.',
              error: err
            })
          });
        }
    })


})

module.exports = router;
