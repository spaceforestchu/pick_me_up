"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  map: {},
  profileMap: {}
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);
  var updatedMap = Object.assign({}, updatedState.map);
  var updatedProfileMap = Object.assign({}, updatedState.profileMap);

  switch (action.type) {
    case constants.COMMENTS_RECEIEVED:
      //console.log("commentsReceived:", JSON.stringify(action.comments));
      //console.log("commentsReceived FROM ZONE:", JSON.stringify(action.zone));

      if (action.zone != null) {
        (function () {
          //updatedState['list'] = action.comments;

          //let updatedMap = Object.assign({}, updatedState.map);
          var zoneComments = updatedMap[action.zone._id];

          if (zoneComments == null) {
            zoneComments = [];
          } else {
            zoneComments = Object.assign([], zoneComments);
          }

          action.comments.forEach(function (comment, i) {
            zoneComments.push(comment);
          });

          updatedMap[action.zone._id] = zoneComments;
          updatedState.map = updatedMap;
        })();
      }

      action.comments.forEach(function (comment, i) {
        var profileComments = updatedProfileMap[comment.author.id] ? updatedProfileMap[comment.author.id] : [];
        profileComments.push(comment);
        updatedProfileMap[comment.author.id] = profileComments;
      });

      updatedState.profileMap = updatedProfileMap;
      console.log("PROFILE MAP: " + JSON.stringify(updatedProfileMap));
      //console.log(JSON.stringify(updatedState));
      return updatedState;

    case constants.COMMENT_CREATED:


      var zoneComment = updatedMap[action.comment.zone];
      if (zoneComment == null) {
        zoneComment = [];
      } else {
        zoneComment = Object.assign([], zoneComments);
      }

      zoneComment.push(action.comment);

      updatedMap[action.comment.zone] = zoneComments;
      updatedState.map = updatedMap;

      return updatedState;

    case constants.COMMENT_UPDATED:
      var list = updatedMap[action.comment.zone];
      var newList = [];
      list.forEach(function (comment, i) {
        if (comment._id == action.comment._id) newList.push(action.comment);else newList.push(comment);
      });
      updatedMap[action.comment.zone] = newList;
      updatedState.map = updatedMap;
      return updatedState;
    default:
      return state;
  }
};