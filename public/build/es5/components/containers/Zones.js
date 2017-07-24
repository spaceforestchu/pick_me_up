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

var Zone = _presentation.Zone;
var CreateZone = _presentation.CreateZone;
var styles = _interopRequire(require("./styles"));

var APIManager = require("../../utils").APIManager;
var actions = _interopRequire(require("../../actions/actions"));

var connect = require("react-redux").connect;
var Zones = (function (Component) {
  function Zones() {
    _classCallCheck(this, Zones);

    _get(Object.getPrototypeOf(Zones.prototype), "constructor", this).call(this);
    this.state = {};
  }

  _inherits(Zones, Component);

  _prototypeProperties(Zones, null, {
    componentDidMount: {
      value: function componentDidMount() {


        this.props.fetchZones(null);
      },
      writable: true,
      configurable: true
    },
    addZone: {
      value: function addZone(zone) {
        var _this = this;
        APIManager.post("/api/zone", zone, function (err, response) {
          if (err) {
            console.log("EROOR: " + err.message);
            return;
          }

          var zone = response.result;
          _this.props.zoneCreated(zone);
        });
      },
      writable: true,
      configurable: true
    },
    selectZone: {
      value: function selectZone(index) {
        this.props.selectZone(index);
      },
      writable: true,
      configurable: true
    },
    render: {
      value: function render() {
        var _this = this;



        var listItems = this.props.list.map(function (zone, index) {
          var selected = index == _this.props.selectedZone;
          return React.createElement(
            "li",
            { key: index },
            React.createElement(Zone, { index: index, select: _this.selectZone.bind(_this), currentZone: zone, isSelected: selected })
          );
        });

        var content = null;

        if (this.props.appStatus == "loading") {
          content = "loading....";
        } else {
          content = React.createElement(
            "div",
            null,
            " ",
            React.createElement(
              "ol",
              null,
              " ",
              listItems
            ),
            " ",
            React.createElement(CreateZone, { onCreate: this.addZone.bind(this) })
          );
        }


        //const content = (this.props.appStatus == 'loading') ? 'loading...' : <div> <ol> {listItems }</ol> <CreateZone onCreate={this.addZone.bind(this)} /></div>;

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

  return Zones;
})(Component);

//store
var stateToProps = function (state) {
  return {
    list: state.zone.list,
    selectedZone: state.zone.selectedZone,
    appStatus: state.zone.appStatus
  };
};

var dispatchToProps = function (dispatch) {
  return {
    zonesReceived: function (zones) {
      return dispatch(actions.zonesReceived(zones));
    },
    zoneCreated: function (zone) {
      return dispatch(actions.zoneCreated(zone));
    },
    selectZone: function (index) {
      return dispatch(actions.selectZone(index));
    },
    fetchZones: function (params) {
      return dispatch(actions.fetchZones(params));
    }
  };
};

module.exports = connect(stateToProps, dispatchToProps)(Zones);