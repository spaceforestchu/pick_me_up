var ProfileController = require('./ProfileController');
var bcrypt = require('bcrypt');

module.exports = {

  currentUser: function(req) {

    return new Promise(function(resolve, reject) {
      if (req.session == null) {
        console.log("ERROR 1");
        resolve(null);
        return;
      }

      if (req.session.user == null) {
        console.log("ERROR 2");
        //reject({message: 'User not logged in'});
        resolve(null);
        return;
      }


      ProfileController.findById(req.session.user)
        .then(function(profile){
          resolve(profile);
        })
        .catch(function(err){
          console.log("ERROR 3");
          reject(err);
        })
    })
  },
  createUser: function(req) {
    return new Promise(function(resolve, reject){

      ProfileController.create(req.body)
        .then(function(user){
          req.session.user = user._id;
          resolve(user);
          return;
        })
        .catch(function(err){
          reject({message: err.message});
          return;
        });
    });

  },

  loginUser: function(req) {
    var params = {username: req.body.username};
    return new Promise(function(resolve, reject){

      ProfileController.find(params)
        .then(function(results){
          var profile = results[0];
          var isPasswordCorrect = bcrypt.compareSync(req.body.password, profile.password);
          if ( isPasswordCorrect == false ) {
            reject({message: 'Wrong password'});
            return;
          }
          req.session.user = profile._id
          resolve(profile);
          return;
        }, function(err){
          if (err) {
            console.log('ERROR: ' + err.message);
            reject({message: err.message});
            return;
          }

          if (results.length === 0) {

            reject({message: err.message});
            return;
          }
        });
    });
  }

}
