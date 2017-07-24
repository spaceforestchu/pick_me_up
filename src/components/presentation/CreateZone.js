import React, { Component } from 'react';

class CreateZone extends Component {

  constructor(){
    super();
    this.state = {
      zone: {
        name: '',
        zipCodes: ''
      }
    }
  }

  updateZone(event){
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone[event.target.id] = event.target.value;
    this.setState({
      zone: updatedZone
    });
  }

  submitZone(event){
    event.preventDefault();
    let updatedZone = Object.assign({}, this.state.zone);
    updatedZone['zipCodes'] = updatedZone.zipCodes.split(',');
    this.props.onCreate(updatedZone);
    this.refs.name.value = '';
    this.refs.zipCodes.value = '';
  }

  render(){
    return(
      <div>
        <input ref='name' id='name' onChange={this.updateZone.bind(this)}  className='form-control' type='text' placeholder='Name' /><br />
        <input ref='zipCodes' id='zipCodes' onChange={this.updateZone.bind(this)} className='form-control' type='text' placeholder='zipCode' /><br />
        <button onClick={this.submitZone.bind(this)} className='btn btn-danger'>Add Zone</button>
      </div>
    )
  }

}

export default CreateZone;
