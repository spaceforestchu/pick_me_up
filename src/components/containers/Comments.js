import React, { Component } from 'react';
import { Comment, CreateComment } from '../presentation';
import styles from './styles';
import { APIManager } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import sha1 from 'sha1';

class Comments extends Component {

  constructor(){
    super();

    this.state = {
      commentImage: {
        image: ''
      }
    }
    this.checkForComments = this.checkForComments.bind(this);
  }

  submitComment(comment) {

    if (this.props.user == null) {
      console.log('Please Sign up or Log In to Comment');
      return;
    }

    let updatedComment = Object.assign({}, comment);

    let zone = this.props.zones[this.props.index];

    updatedComment['zone'] = zone._id;
    updatedComment['username'] = this.props.user.username;
    updatedComment['author'] = {
      username: this.props.user.username,
      id: this.props.user._id,
      image: this.props.user.image
    }

    //console.log(this.state.commentImage);
    updatedComment['image'] = this.state.commentImage.image;


    APIManager.post('/api/comment', updatedComment, (err, response) => {
        if (err) {
          console.log('EROOR: ' + err.message);
          return;
        }

        var comment = response.result;

        this.props.commentCreated(comment);
      });
  }


  checkForComments(){
    let zone = this.props.zones[this.props.index];
    if (zone == null) {
        console.log('No Seleced Zone!!!!');
        return;
    }

    let commentsArray = this.props.commentsMap[zone._id];

    if (commentsArray != null) {
      return;
    }

    APIManager.get('/api/comment', {zone:zone._id}, (err, response) => {
      if (err) {
        console.log('ERROR: ' + err.message);
        return;
      }

      let comments = response.results;
      this.props.commentsReceived(comments, zone);

    });
  }

  componentDidMount() {
    this.checkForComments();
  }

  componentDidUpdate() {
    this.checkForComments();
  }


  updateComment(comment, updatedBody) {
    console.log('updated: ' + comment._id +  updatedBody);
    this.props.updateComment(comment, {body: updatedBody})
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

      let updateProfile = Object.assign({}, this.state.commentImage);
      updateProfile['image'] = response.body['secure_url'];
      this.setState({
        commentImage: updateProfile
      });
    });
  }

  render(){

    const selectedZone = this.props.zones[this.props.index]
    const currentUser = this.props.user;


    let zoneName = null;
    let commentList = null;

    if (selectedZone != null) {
      zoneName = selectedZone.name;
      let zoneComments = this.props.commentsMap[selectedZone._id];

      if ( zoneComments != null) {
        commentList = zoneComments.map( (comment, index) => {
          let editable = false
          if ( currentUser != null) {
            if (currentUser._id == comment.author.id) {
              editable = true
            }
          }
          return (
            <li key={index}>
              <Comment isEditable={editable} onUpdate={this.updateComment.bind(this)} currentComment={comment}/>
            </li>
          )
        })
      }

    }



    return (
      <div>
        <h2>Comments: Zone {zoneName}</h2>
        <div style={styles.comment.commentBox}>
          <ul style={styles.comment.commentList}>
            { commentList }
          </ul>
          <CreateComment onCreate={this.submitComment.bind(this)} uploadImage={this.uploadImage.bind(this)}/>
      </div>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    commentsMap: state.comment.map,
    index: state.zone.selectedZone,
    zones: state.zone.list,
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    commentsReceived: (comments, zone) => dispatch(actions.commentsReceived(comments, zone)),
    commentCreated: (comment) => dispatch(actions.commentCreated(comment)),
    updateComment: (comment, params) => dispatch(actions.updateComment(comment, params))
  }
}

export default connect(stateToProps, dispatchToProps)(Comments);
