"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var styles = _interopRequire(require("./styles"));

var Zone = (function (Component) {
  function Zone() {
    _classCallCheck(this, Zone);

    if (Component != null) {
      Component.apply(this, arguments);
    }
  }

  _inherits(Zone, Component);

  _prototypeProperties(Zone, null, {
    onSelectTitle: {
      value: function onSelectTitle(event) {
        event.preventDefault();
        //console.log("onSelectTitle:" , this.props.index)
        this.props.select(this.props.index);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var style = styles.zone;
        var title = this.props.isSelected ? React.createElement(
          "a",
          { style: style.title, href: "#" },
          this.props.currentZone.name
        ) : React.createElement(
          "a",
          { href: "#" },
          this.props.currentZone.name
        );


        return React.createElement(
          "div",
          { style: style.container },
          React.createElement(
            "h2",
            { onClick: this.onSelectTitle.bind(this), style: style.header },
            title
          ),
          React.createElement(
            "span",
            null,
            this.props.currentZone.zipCodes
          ),
          React.createElement("br", null),
          React.createElement(
            "span",
            null,
            this.props.currentZone.comment,
            " comments"
          )
        );
      },
      writable: true,
      configurable: true
    }
  });

  return Zone;
})(Component);

module.exports = Zone;