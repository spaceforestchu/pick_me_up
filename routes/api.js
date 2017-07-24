var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/:resource', function(req, res, next){

  var resource = req.params.resource;

  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: "Invalid Resource Request: " + resource
    });
    return
  }

  controller.find(req.query)
    .then(function(results){
      res.json({
        confirmation: 'success',
        results: results
      });
      return;
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        messager: err
      });
      return;
    });

});

router.get('/:resource/:id', function(req, res, next){
  var resource = req.params.resource;
  var id = req.params.id;

  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: "Invalid Resource Request: " + resource
    });
    return
  }


  controller.findById(id)
    .then(function(result){
      res.json({
        confirmation: 'success',
        result: result
      });
      return;
    })
    .catch(function(err){
      res.json({
        confirmation: 'err',
        message: 'Not Found'
      });
      return;
    })
});

router.post('/:resource', function(req, res, next){

  var resource = req.params.resource;
  var resource = req.params.resource;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: "Invalid Resource Request: " + resource
    });
    return
  }

  controller.create(req.body)
    .then(function(result){
      res.json({
        confirmation: 'success',
        result: result
      });
      return;
    })
    .catch(function(err){
      res.json({
        confirmation: 'err',
        message: err
      });
      return
    });
});

router.put('/:resource/:id', function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;

  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource Request: ' + resource
    });
    return;
  }


  controller.update(id, req.body)
    .then(function(result){
      res.json({
        confirmation: 'success',
        result: result
      })
      return;
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err
      });
      return;
    })
});

module.exports = router;
