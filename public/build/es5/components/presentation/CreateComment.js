"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Dropzone = _interopRequire(require("react-dropzone"));

var CreateComment = (function (Component) {
  function CreateComment() {
    _classCallCheck(this, CreateComment);

    _get(Object.getPrototypeOf(CreateComment.prototype), "constructor", this).call(this);
    this.state = {
      comment: {
        body: ""
      }
    };
  }

  _inherits(CreateComment, Component);

  _prototypeProperties(CreateComment, null, {
    updateComment: {
      value: function updateComment(event) {
        var updatedComment = Object.assign({}, this.state.comment);
        updatedComment[event.target.id] = event.target.value;

        this.setState({
          comment: updatedComment
        });

      },
      writable: true,
      configurable: true
    },
    submitComment: {
      value: function submitComment(event) {
        event.preventDefault();
        this.props.onCreate(this.state.comment);
        this.refs.body.value = "";
      },
      writable: true,
      configurable: true
    },
    uploadImage: {
      value: function uploadImage(files) {
        this.props.uploadImage(files);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            "Create Comment"
          ),
          React.createElement("input", { ref: "body", id: "body", onChange: this.updateComment.bind(this), className: "form-control", type: "text", placeholder: "Comment" }),
          React.createElement("br", null),
          React.createElement(
            "button",
            { onClick: this.submitComment.bind(this), className: "btn btn-info" },
            "Submit Comment"
          ),
          React.createElement(
            Dropzone,
            { style: { marginLeft: 5 + "px" }, onDrop: this.uploadImage.bind(this), className: "btn btn-danger" },
            "Upload Image"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return CreateComment;
})(Component);

module.exports = CreateComment;