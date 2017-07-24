"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var superagent = _interopRequire(require("superagent"));

module.exports = {

  get: function (url, params, callback) {
    superagent.get(url).query(params).set("Accept", "application/json").end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }

      var confirmation = response.body.confirmation;

      if (confirmation != "success") {
        callback({ message: response.body.message }, null);
        return;
      }
      callback(null, response.body);
      return;
    });
  },

  post: function (url, body, callback) {
    superagent.post(url).send(body).set("Accept", "application/json").end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response.body);
      return;
    });
  },

  put: function (url, body, callback) {
    superagent.put(url).send(body).set("Accept", "application/json").end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response.body);
      return;
    });
  },

  "delete": function () {},

  upload: function (endpoint, file, params, callback) {
    var uploadRequest = superagent.post(endpoint);

    uploadRequest.attach("file", file);
    Object.keys(params).forEach(function (key, index) {
      uploadRequest.field(key, params[key]);
    });

    uploadRequest.end(function (err, response) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, response);
      return;
    });
  }

};