import React, { Component } from 'react';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';

class Profile extends Component {

  constructor(){
    super()
    this.state = {

    }
  }


  componentDidMount() {
    console.log('17: ' + this.props.profiles[this.props.username]);
    const profile = this.props.profiles[this.props.username];
    console.log("18: " + JSON.stringify(profile));
    if (profile != null) {//Server loading
      console.log('Profile ready loaded: '+ JSON.stringify(this.props.comments));
      this.props.fetchComments({'author.id': profile._id})
      return;
      }
    this.props.fetchProfile({username: this.props.username});
  }

  render () {
    let header = null;
    let profile = this.props.profiles[this.props.username];

    if (profile != null) {

      const comments = this.props.comments[profile._id] ? this.props.comments[profile._id] : [];
      const list = comments.map( (comment, i) => {
        return (
          <li key={i}>
            {comment.body}
          </li>
        )
      })
      header = (
        <div>
          <h3>{profile.username}</h3>
          <p>
            gender: {profile.gender} <br />
            City: {profile.city}
          </p>
          <h2>Comments</h2>
          <ol>
            { list }
          </ol>
        </div>
      )
    }

    const content = (this.props.appStatus == 'loading') ? 'Loading...' : header;

    return (
      <div>
        {content}
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    comments: state.comment.profileMap,
    profiles: state.profile.map,
    appStatus: state.profile.appStatus
  }
}

const dispatchToProps = (dispatch) => {
  return {
    fetchProfile: (params) => dispatch(actions.fetchProfile(params)),
    fetchComments: (params) => dispatch(actions.fetchComments(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Profile);
