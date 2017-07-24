var Zone = require('../models/Zone');

module.exports = {
  find: function(params) {
    return new Promise(function(resolve, reject) {
      Zone.find(params, function(err, zones){
        if (err) {
          reject(err);
          return;
        }
        console.log(zones);
        resolve(zones);
        return;
      });
    })
  },

  findById: function(id) {
    return new Promise(function(resolve, reject){
      Zone.findById(id, function(err, profile){
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
      Zone.create(params, function(err, zone){
        if (err) {
           reject(err);
           return;
        }
        resolve(zone);
        return;
      });
    });
  },

  update: function(id, params) {

    return new Promise(function(resolve, reject){
      Zone.findByIdAndUpdate(id, params, {new:true}, function(err, zone){
        if (err) {
          reject(err);
          return;
        }
        resolve(zone);
        return;
      });
    });
  },

  delete: function(id, callback) {
    Zone.findByIdAndRemove(id, function(err, comment){
    if(err){
      callback(err);
      return;
    }
    callback(comment);
    return;
  });
  }


}
