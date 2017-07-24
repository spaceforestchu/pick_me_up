import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import Dropzone from 'react-dropzone';
import { APIManager, ImageHelper } from '../../utils';
import sha1 from 'sha1';

class CurrentUser extends Component {

  constructor(){
    super()
    this.state = {
      updated: {

      }
    }
  }

  componentDidMount(){
    //console.log(JSON.stringify(this.props.user));

  }

  updatedCurrentUser(event){
    event.preventDefault();
    console.log('updatedCurrentUser:' + event.target.id + event.target.value);
    let updatedProfile = Object.assign({}, this.state.updated);

    updatedProfile[event.target.id] = event.target.value;

    this.setState({
      updated: updatedProfile
    });
  }

  updateProfile (event) {
    event.preventDefault();

    if (Object.keys(this.state.updated).length == 0){
        console.log('No Changes Made');
        return;
    }

    this.props.updateProfile(this.props.user, this.state.updated)
  }

  uploadImage (files) {
    const image = files[0];

    const cloudName = 'hiefttilx';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    let timestamp = Date.now() / 1000;
    const uploadPreset = 'i7wnsua4';
    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'6CxPO7eYqBzN8NH1uz7QRRyIlss';
    const signature = sha1(paramsStr);

    const params = {
      'api_key': '925849334774272',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    APIManager.upload(url, image, params, (err, response) => {
      if (err) {
        console.log('UPLOAD ERROR: ' + JSON.stringify(err));
        return;
      }
      const imageUrl = response.body['secure_url'];

      let updateProfile = Object.assign({}, this.state.updated);
      updateProfile['image'] = response.body['secure_url'];

      this.setState({
        updated: updateProfile
      });
    });
  }

  render(){

    const currentUser = this.props.user;
    const image = (this.state.updated.image == null) ? '' : ImageHelper.thumbnail(this.state.updated.image, 150);

    return (
      <div>
        Welcome { currentUser.username} <br />
        <input type='text' id='username' onChange={this.updatedCurrentUser.bind(this)} defaultValue={currentUser.username} placeholder='Username' /><br />
        <input type='text' id='gender' onChange={this.updatedCurrentUser.bind(this)} defaultValue={currentUser.gender} placeholder='Gender' /><br />
        <input type='text' id='city' onChange={this.updatedCurrentUser.bind(this)} defaultValue={currentUser.city} placeholder='City' /><br />
        <Dropzone className="btn btn-info" onDrop={this.uploadImage.bind(this)}>Upload </Dropzone><br />
        <button onClick={this.updateProfile.bind(this)}>Update Profile</button><br />
        <img src={image} /><br />
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile, updated) => dispatch(actions.updateProfile(profile, updated))
  }
}


export default connect(stateToProps, dispatchToProps)(CurrentUser);
