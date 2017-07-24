"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants/constants"));

var initialState = {
  user: null
};

module.exports = function (_x, action) {
  var state = arguments[0] === undefined ? initialState : arguments[0];
  var updatedState = Object.assign({}, state);

  switch (action.type) {
    case constants.CURRENT_USER_RECEIVED:


      console.log("CURRENT_USER_RECEIVED: " + JSON.stringify(action.user));
      updatedState.user = action.user;
      return updatedState;

    case constants.PROFILED_UPDATED:


      console.log(action.profile);

      if (action.profile._id != updatedState.user._id) {
        return updatedState;
      }

      updatedState.user = action.profile;

      return updatedState;

    default:
      return updatedState;
  }
};