import React, { Component } from 'react';
import { APIManager, ImageHelper } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import { Link } from 'react-router';

class Account extends Component {

  constructor(){
    super();
    this.state = {
      profile: {
        username: '',
        password: '',
        city: '',
        gender: ''
      }
    }
  }


  componentDidMount(){
    APIManager.get('/account/currentuser', null, (err, response) => {
      if (err) {
          console.log(err.message);
          return;
      }
      //console.log(JSON.stringify(response));
      this.props.currentUserReceived(response.user);
    });
  }



  login(event){
    event.preventDefault();

    if (this.state.profile.username.length == 0) {
      console.log('Please enter your name!');
      return;
    }

    if (this.state.profile.password.length == 0) {
      console.log('Please enter a password!');
      return;
    }

    APIManager.post('/account/login', this.state.profile, (err, response) => {
      if (err) {
          console.log(err.message);
          return;
      }
      console.log(JSON.stringify(response));
      this.props.currentUserReceived(response.user);
    });

  }

  signup(event){
    event.preventDefault();
    console.log(this.state.profile);
    if (this.state.profile.username.length == 0) {
      console.log('Please enter your name!');
      return;
    }

    if (this.state.profile.password.length == 0) {
      console.log('Please enter a password!');
      return;
    }

    APIManager.post('/account/register', this.state.profile, (err, response) => {
      if (err) {
          console.log(err.message);
          return;
      }
      console.log(JSON.stringify(response));
      this.props.currentUserReceived(response.user);
    })

  }

  updateProfile(event){
    event.preventDefault();
    //console.log(event.target.id + '=' + event.target.value);

    let updatedProfile = Object.assign({}, this.state.profile);
    updatedProfile[event.target.id] = event.target.value;
    this.setState({
      profile: updatedProfile
    });

  }

  logout(event){
    event.preventDefault();

    APIManager.get('/account/logout', null, (err, response) => {
      if (err) {
        console.log(err.message);
        return;
      }
      this.props.currentUserReceived(null);
    });
  }


  render () {
    let content = null;

    if (this.props.user == null) {
      content = (
        <div>
          <h2>Login</h2>
          <input id='username' onChange={this.updateProfile.bind(this)} type='text' placeholder='username' /> <br />
          <input id='password' onChange={this.updateProfile.bind(this)} type='password' placeholder='password' /> <br />
          <button onClick={this.login.bind(this)}>Log In</button>
          <br />
          <h2>Sign Up</h2>
          <input id='username'  onChange={this.updateProfile.bind(this)}  type='text' placeholder='username' /> <br />
          <input id='password' onChange={this.updateProfile.bind(this)}  type='password' placeholder='password' /> <br />
          <input id='city' onChange={this.updateProfile.bind(this)}  type='text' placeholder='city' /> <br />
          <input id='gender' onChange={this.updateProfile.bind(this)}  type='text' placeholder='gender' /> <br />
          <button onClick={this.signup.bind(this)}>Join</button>
          <br />
      </div>
      )
    } else {
      content = (

        <div>
          <img style={{borderRadius: 45, float: 'left', marginRight: 12}} src={ImageHelper.thumbnail(this.props.user.image, 72)}/>
          <h2>Welcome {this.props.user.username}</h2>
          <span>{this.props.user.city}</span><br />
          <button onClick={this.logout.bind(this)}>Log out</button>
          <Link to='/currentuser'><button>Account</button></Link>
        </div>
      )
    }

    return (
      <div>
        { content }
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
    currentUserReceived: (user) => dispatch(actions.currentUserReceived(user))
  }
}

export default connect(stateToProps, dispatchToProps)(Account);
