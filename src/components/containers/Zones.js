import React, { Component } from 'react';
import { Zone, CreateZone } from '../presentation';
import styles from './styles'
import { APIManager } from '../../utils';
import actions from '../../actions/actions';
import { connect } from 'react-redux';

class Zones extends Component {

  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){


    this.props.fetchZones(null);

  }

  addZone(zone){
    APIManager.post('/api/zone', zone, (err, response) => {
      if (err) {
        console.log('EROOR: ' + err.message);
        return;
      }

      let zone = response.result;
      this.props.zoneCreated(zone);
    });
  }

  selectZone(index){

    this.props.selectZone(index);

  }

  render() {


    const listItems = this.props.list.map( (zone, index) => {
      let selected = (index == this.props.selectedZone)
      return(
        <li key={index}>
          <Zone index={index} select={this.selectZone.bind(this)} currentZone={zone}  isSelected={selected} />
        </li>
      )
    })

    let content = null;

    if (this.props.appStatus == 'loading') {
      content = 'loading....'
    } else {
      content = (
          <div> <ol> {listItems }</ol> <CreateZone onCreate={this.addZone.bind(this)} /></div>
        )
    }


    //const content = (this.props.appStatus == 'loading') ? 'loading...' : <div> <ol> {listItems }</ol> <CreateZone onCreate={this.addZone.bind(this)} /></div>;

    return(
      <div>
        { content }
      </div>
    )
  }
}

//store
const stateToProps = (state) => {
  return {
    list: state.zone.list,
    selectedZone: state.zone.selectedZone,
    appStatus: state.zone.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return {
    zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
    zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
    selectZone: (index) => dispatch(actions.selectZone(index)),
    fetchZones: (params) => dispatch(actions.fetchZones(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Zones);
