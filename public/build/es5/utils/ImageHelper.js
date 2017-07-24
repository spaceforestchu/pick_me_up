"use strict";

module.exports = {

  thumbnail: function (url, dimen) {
    var thumbParams = "upload/c_thumb,h_" + dimen + ",q_100,r_99,w_" + dimen + ",x_0,y_0/a_0";
    var dynamic = url.replace("upload", thumbParams);
    return dynamic;
  },

  commentNail: function (url) {
    return url.replace("upload", "upload/c_limit,h_100,w_100");
  }

};