var Commment = require('../models/Comment');

module.exports = {

  find: function(params) {
    return new Promise(function(resolve, reject) {
      Commment.find(params, function(err, comments){
        if (err) {
          reject(err);
          return;
        }
        resolve(comments);
        return;
      });
    });

  },

  findById: function(id) {
    return new Promise(function(resolve, reject){
      Commment.findById(id, function(err, profile){
        if(err){
          reject(err);
          return;
        }
        resolve(profile);
        return;
      });
    })
  },

  create: function(params) {
    return new Promise(function(resolve, reject){
      Commment.create(params, function(err, comment){
        if (err) {
           reject(err);
           return;
        }
        resolve(comment);
        return;
      });
    })
  },

  update: function(id, params) {
    return new Promise(function(resolve, reject){
      Commment.findByIdAndUpdate(id, params, {new:true}, function(err, comment){
        if (err) {
          reject(err);
          return;
        }
        resolve(comment);
        return;
      });
    })
  },

  delete: function(id, callback) {
    Commment.findByIdAndRemove(id, function(err, comment){
    if(err){
      callback(err);
      return;
    }
    callback(comment);
    return;
  });
  }


}
