"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var _presentation = require("../presentation");

var Comment = _presentation.Comment;
var CreateComment = _presentation.CreateComment;
var styles = _interopRequire(require("./styles"));

var APIManager = require("../../utils").APIManager;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var sha1 = _interopRequire(require("sha1"));

var Comments = (function (Component) {
  function Comments() {
    _classCallCheck(this, Comments);

    _get(Object.getPrototypeOf(Comments.prototype), "constructor", this).call(this);

    this.state = {
      commentImage: {
        image: ""
      }
    };
    this.checkForComments = this.checkForComments.bind(this);
  }

  _inherits(Comments, Component);

  _prototypeProperties(Comments, null, {
    submitComment: {
      value: function submitComment(comment) {
        var _this = this;


        if (this.props.user == null) {
          console.log("Please Sign up or Log In to Comment");
          return;
        }

        var updatedComment = Object.assign({}, comment);

        var zone = this.props.zones[this.props.index];

        updatedComment.zone = zone._id;
        updatedComment.username = this.props.user.username;
        updatedComment.author = {
          username: this.props.user.username,
          id: this.props.user._id,
          image: this.props.user.image
        };

        //console.log(this.state.commentImage);
        updatedComment.image = this.state.commentImage.image;


        APIManager.post("/api/comment", updatedComment, function (err, response) {
          if (err) {
            console.log("EROOR: " + err.message);
            return;
          }

          var comment = response.result;

          _this.props.commentCreated(comment);
        });
      },
      writable: true,
      configurable: true
    },
    checkForComments: {
      value: function checkForComments() {
        var _this = this;
        var zone = this.props.zones[this.props.index];
        if (zone == null) {
          console.log("No Seleced Zone!!!!");
          return;
        }

        var commentsArray = this.props.commentsMap[zone._id];

        if (commentsArray != null) {
          return;
        }

        APIManager.get("/api/comment", { zone: zone._id }, function (err, response) {
          if (err) {
            console.log("ERROR: " + err.message);
            return;
          }

          var comments = response.results;
          _this.props.commentsReceived(comments, zone);
        });
      },
      writable: true,
      configurable: true
    },
    componentDidMount: {
      value: function componentDidMount() {
        this.checkForComments();
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        this.checkForComments();
      },
      writable: true,
      configurable: true
    },
    updateComment: {
      value: function updateComment(comment, updatedBody) {
        console.log("updated: " + comment._id + updatedBody);
        this.props.updateComment(comment, { body: updatedBody });
      },
      writable: true,
      configurable: true
    },
    uploadImage: {
      value: function uploadImage(files) {
        var _this = this;
        var image = files[0];

        var cloudName = "hiefttilx";
        var url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";

        var timestamp = Date.now() / 1000;
        var uploadPreset = "i7wnsua4";
        var paramsStr = "timestamp=" + timestamp + "&upload_preset=" + uploadPreset + "6CxPO7eYqBzN8NH1uz7QRRyIlss";
        var signature = sha1(paramsStr);

        var params = {
          api_key: "925849334774272",
          timestamp: timestamp,
          upload_preset: uploadPreset,
          signature: signature
        };

        APIManager.upload(url, image, params, function (err, response) {
          if (err) {
            console.log("UPLOAD ERROR: " + JSON.stringify(err));
            return;
          }
          var imageUrl = response.body.secure_url;

          var updateProfile = Object.assign({}, _this.state.commentImage);
          updateProfile.image = response.body.secure_url;
          _this.setState({
            commentImage: updateProfile
          });
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;


        var selectedZone = this.props.zones[this.props.index];
        var currentUser = this.props.user;


        var zoneName = null;
        var commentList = null;

        if (selectedZone != null) {
          zoneName = selectedZone.name;
          var zoneComments = this.props.commentsMap[selectedZone._id];

          if (zoneComments != null) {
            commentList = zoneComments.map(function (comment, index) {
              var editable = false;
              if (currentUser != null) {
                if (currentUser._id == comment.author.id) {
                  editable = true;
                }
              }
              return React.createElement(
                "li",
                { key: index },
                React.createElement(Comment, { isEditable: editable, onUpdate: _this.updateComment.bind(_this), currentComment: comment })
              );
            });
          }
        }



        return React.createElement(
          "div",
          null,
          React.createElement(
            "h2",
            null,
            "Comments: Zone ",
            zoneName
          ),
          React.createElement(
            "div",
            { style: styles.comment.commentBox },
            React.createElement(
              "ul",
              { style: styles.comment.commentList },
              commentList
            ),
            React.createElement(CreateComment, { onCreate: this.submitComment.bind(this), uploadImage: this.uploadImage.bind(this) })
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Comments;
})(Component);

var stateToProps = function (state) {
  return {
    commentsMap: state.comment.map,
    index: state.zone.selectedZone,
    zones: state.zone.list,
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    commentsReceived: function (comments, zone) {
      return dispatch(actions.commentsReceived(comments, zone));
    },
    commentCreated: function (comment) {
      return dispatch(actions.commentCreated(comment));
    },
    updateComment: function (comment, params) {
      return dispatch(actions.updateComment(comment, params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Comments);