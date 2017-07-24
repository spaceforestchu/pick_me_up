var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');
var AccountController = require('../controllers/AccountController');

router.get('/:action', function(req, res, next) {

  var action = req.params.action;

  if (action == 'logout') {
    req.session.reset();
    res.json({
      confirmation: 'success',
      message: 'Bye!'
    });
    return;
  }

  if (action == 'login') {
    res.json({
      confirmation: 'success',
      action: action
    });
    return;
  }

  if (action == 'currentuser') {
    AccountController.currentUser(req)
      .then(function(result){
        res.json({
          confirmation: 'success',
          user: result
        });
        return;
      })
      .catch(function(err){
        res.json({
          confirmation: 'fail',
          message: err.message
        });
        return;
      });

  }
});


router.post('/:action', function(req, res, next) {

  var action = req.params.action;
  console.log(action);
  if (action == 'register') {

    AccountController.createUser(req)
      .then(function(result){
        res.json({
          confirmation: 'success',
          user: result
        });
        return;
      })
      .then(function(err){
        res.json({
          confirmation: 'fail',
          messager: err.message
        });
        return;
      });
  }


  if (action == 'login') {

    AccountController.loginUser(req)
      .then(function(profile){
        res.json({
          confirmation: 'Log in Success',
          user: profile
        });
        return;
      })
      .then(function(err){
        res.json({
          confirmation: 'Failure. Check password or username',
          messager: err.message
        });
        return;
      })
  }
});

module.exports = router;
