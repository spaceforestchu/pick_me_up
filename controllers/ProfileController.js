var Profile = require('../models/Profile');
var bcrypt = require('bcrypt');

module.exports = {

  find: function(params) {
    return new Promise(function(resolve, reject){
      Profile.find(params, function(err, Profiles){
        if (err) {
          reject(err);
          return;
        }
        resolve(Profiles);
        return;
      });
    });
  },

  findById: function(id) {

    return new Promise(function(resolve, reject){
      Profile.findById(id, function(err, profile){
        if(err){
          reject(err);
          return;
        }

        resolve(profile);
        return;
      });
    })
  },

  create: function(params, callback) {
    let hashedPassword = bcrypt.hashSync(params['password'], 10);
    params['password'] = hashedPassword;
    return new Promise(function(resolve, reject){
      Profile.create(params, function(err, profile){
        if(err) {
          reject(err);
          return;
        }
        resolve(profile);
        return;
      })
    });
  },

  update: function(id, params) {
    return new Promise(function(resolve, reject){
      Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
        if (err) {
          reject(err);
          return;
        }
        resolve(profile);
        return;
      });
    })
  },

  delete: function(id, callback) {
    Profile.findByIdAndRemove(id, function(err, profile){
      if(err){
        callback(err);
        return;
      }
      callback(profile);
      return;
    });
  }


}
