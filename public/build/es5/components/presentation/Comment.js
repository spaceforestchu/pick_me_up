"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var styles = _interopRequire(require("./styles"));

var Link = require("react-router").Link;
var ImageHelper = require("../../utils").ImageHelper;
var Comment = (function (Component) {
  function Comment() {
    _classCallCheck(this, Comment);

    _get(Object.getPrototypeOf(Comment.prototype), "constructor", this).call(this);
    this.state = {
      isEditing: false,
      updated: null
    };
  }

  _inherits(Comment, Component);

  _prototypeProperties(Comment, null, {
    toggleEdited: {
      value: function toggleEdited(event) {
        event.preventDefault();
        console.log("Edit");
        if (this.state.isEditing) {
          if (this.state.updated != null) {
            this.props.onUpdate(this.props.currentComment, this.state.updated);
          }
        }

        this.setState({
          isEditing: !this.state.isEditing
        });
      },
      writable: true,
      configurable: true
    },
    componentDidUpdate: {
      value: function componentDidUpdate() {
        console.log(this.state.isEditing);
      },
      writable: true,
      configurable: true
    },
    updateBody: {
      value: function updateBody(event) {
        console.log("updatebody:", event.target.value);
        this.setState({
          updated: event.target.value
        });
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var currentComment = this.props.currentComment;
        //console.log("currentComment: " + JSON.stringify(currentComment));
        var author = currentComment.author;
        var radius = 20;
        var editable = this.props.isEditable ? this.props.isEditable : false;

        var content = null;

        if (this.state.isEditing == true) {
          content = React.createElement(
            "div",
            null,
            React.createElement("textarea", { onChange: this.updateBody.bind(this), defaultValue: currentComment.body, style: { width: 100 + "%" } }),
            React.createElement("br", null),
            React.createElement("img", { style: { borderRadius: radius, marginRight: 6 }, src: ImageHelper.thumbnail(author.image, radius * 2) }),
            React.createElement(
              "span",
              { style: (styles.comment.commentSpan, styles.comment.commentSpanWithMargin) },
              React.createElement(
                Link,
                { to: "/profile/" + author.username },
                author.username
              )
            ),
            React.createElement(
              "span",
              null,
              "|"
            ),
            React.createElement(
              "span",
              { style: styles.comment.commentSpanWithMargin },
              currentComment.timestamp
            ),
            React.createElement(
              "button",
              { onClick: this.toggleEdited.bind(this) },
              "Done"
            ),
            React.createElement("hr", null)
          );
        } else {
          content = React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              null,
              React.createElement("img", { src: ImageHelper.commentNail(currentComment.image) })
            ),
            React.createElement(
              "p",
              { style: styles.comment.commentP },
              currentComment.body
            ),
            React.createElement("img", { style: { borderRadius: radius, marginRight: 6 }, src: ImageHelper.thumbnail(author.image, radius * 2) }),
            React.createElement(
              "span",
              { style: (styles.comment.commentSpan, styles.comment.commentSpanWithMargin) },
              React.createElement(
                Link,
                { to: "/profile/" + author.username },
                author.username
              )
            ),
            React.createElement(
              "span",
              null,
              "|"
            ),
            React.createElement(
              "span",
              { style: styles.comment.commentSpanWithMargin },
              currentComment.timestamp
            ),
            editable ? React.createElement(
              "button",
              { onClick: this.toggleEdited.bind(this) },
              "Edit"
            ) : null,
            React.createElement("hr", null)
          );
        }
        return React.createElement(
          "div",
          null,
          content
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Comment;
})(Component);

module.exports = Comment;