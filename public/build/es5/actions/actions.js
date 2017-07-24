"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var APIManager = require("../utils").APIManager;
module.exports = {
  zonesReceived: function (zones) {
    return {
      type: constants.ZONES_RECEIVED,
      zones: zones
    };
  },

  zoneCreated: function (zone) {
    return {
      type: constants.ZONE_CREATED,
      zone: zone
    };
  },

  selectZone: function (index) {
    return {
      type: constants.SELECT_ZONE,
      selectedZone: index
    };
  },

  commentsReceived: function (comments, zone) {
    return {
      type: constants.COMMENTS_RECEIEVED,
      comments: comments,
      zone: zone
    };
  },

  commentCreated: function (comment) {
    return {
      type: constants.COMMENT_CREATED,
      comment: comment
    };
  },

  currentUserReceived: function (user) {
    return {
      type: constants.CURRENT_USER_RECEIVED,
      user: user
    };
  },

  fetchProfile: function (params) {
    console.log("params" + JSON.stringify(params));
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading"
      });


      APIManager.get("/api/profile", params, function (err, response) {
        if (err) {
          console.log("ERROR: " + err);
          return;
        }
        //console.log("64" + JSON.stringify(response));
        if (response.results.length == 0) {
          console.log("Profile Not Found.");
          return;
        }
        var profile = response.results[0];
        dispatch({
          type: constants.PROFILE_RECEIVED,
          profile: profile,
          reducer: "profile"
        });
      });
    };
  },

  fetchZones: function (params) {
    return function (dispatch) {
      dispatch({
        type: constants.APPLICATION_STATE,
        status: "loading"
      });

      APIManager.get("/api/zone", params, function (err, response) {
        if (err) {
          console.log(err);
          return;
        }
        var zones = response.results;


        dispatch({
          type: constants.ZONES_RECEIVED,
          zones: zones,
          reducer: "zone"
        });
      });
    };
  },

  updateProfile: function (profile, updated) {
    return function (dispatch) {
      var endpoint = "/api/profile/" + profile._id;

      APIManager.put(endpoint, updated, function (err, response) {
        if (err) {
          console.log("ERROR: " + JSON.stringify(err));
          return;
        }
        var updatedProfile = response.result;
        dispatch({
          type: constants.PROFILED_UPDATED,
          profile: updatedProfile
        });
      });
    };
  },

  updateComment: function (comment, params) {
    return function (dispatch) {
      var endpoint = "/api/comment/" + comment._id;
      APIManager.put(endpoint, params, function (err, response) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(JSON.stringify(response));
        var updatedComment = response.result;
        dispatch({
          type: constants.COMMENT_UPDATED,
          comment: updatedComment
        });
      });
    };
  },

  fetchComments: function (params) {
    return function (dispatch) {
      APIManager.get("/api/comment", params, function (err, response) {
        if (err) {
          alert(err);
          return;
        }
        console.log(JSON.stringify(response));
        var comments = response.results;
        dispatch({
          type: constants.COMMENTS_RECEIEVED,
          comments: comments
        });
      });
    };
  }

};
//console.log(JSON.stringify(response));