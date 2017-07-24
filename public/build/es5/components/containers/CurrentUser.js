"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var connect = require("react-redux").connect;
var actions = _interopRequire(require("../../actions/actions"));

var Dropzone = _interopRequire(require("react-dropzone"));

var _utils = require("../../utils");

var APIManager = _utils.APIManager;
var ImageHelper = _utils.ImageHelper;
var sha1 = _interopRequire(require("sha1"));

var CurrentUser = (function (Component) {
  function CurrentUser() {
    _classCallCheck(this, CurrentUser);

    _get(Object.getPrototypeOf(CurrentUser.prototype), "constructor", this).call(this);
    this.state = {
      updated: {}
    };
  }

  _inherits(CurrentUser, Component);

  _prototypeProperties(CurrentUser, null, {
    componentDidMount: {
      value: function componentDidMount() {},
      writable: true,
      configurable: true
    },
    updatedCurrentUser: {
      value: function updatedCurrentUser(event) {
        event.preventDefault();
        console.log("updatedCurrentUser:" + event.target.id + event.target.value);
        var updatedProfile = Object.assign({}, this.state.updated);

        updatedProfile[event.target.id] = event.target.value;

        this.setState({
          updated: updatedProfile
        });
      },
      writable: true,
      configurable: true
    },
    updateProfile: {
      value: function updateProfile(event) {
        event.preventDefault();

        if (Object.keys(this.state.updated).length == 0) {
          console.log("No Changes Made");
          return;
        }

        this.props.updateProfile(this.props.user, this.state.updated);
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

          var updateProfile = Object.assign({}, _this.state.updated);
          updateProfile.image = response.body.secure_url;

          _this.setState({
            updated: updateProfile
          });
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var currentUser = this.props.user;
        var image = this.state.updated.image == null ? "" : ImageHelper.thumbnail(this.state.updated.image, 150);

        return React.createElement(
          "div",
          null,
          "Welcome ",
          currentUser.username,
          " ",
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "username", onChange: this.updatedCurrentUser.bind(this), defaultValue: currentUser.username, placeholder: "Username" }),
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "gender", onChange: this.updatedCurrentUser.bind(this), defaultValue: currentUser.gender, placeholder: "Gender" }),
          React.createElement("br", null),
          React.createElement("input", { type: "text", id: "city", onChange: this.updatedCurrentUser.bind(this), defaultValue: currentUser.city, placeholder: "City" }),
          React.createElement("br", null),
          React.createElement(
            Dropzone,
            { className: "btn btn-info", onDrop: this.uploadImage.bind(this) },
            "Upload "
          ),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.updateProfile.bind(this) },
            "Update Profile"
          ),
          React.createElement("br", null),
          React.createElement("img", { src: image }),
          React.createElement("br", null)
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CurrentUser;
})(Component);

var stateToProps = function (state) {
  return {
    user: state.account.user
  };
};

var dispatchToProps = function (dispatch) {
  return {
    updateProfile: function (profile, updated) {
      return dispatch(actions.updateProfile(profile, updated));
    }
  };
};


module.exports = connect(stateToProps, dispatchToProps)(CurrentUser);
//console.log(JSON.stringify(this.props.user));