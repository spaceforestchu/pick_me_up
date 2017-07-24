import React, { Component } from 'react';
import styles from './styles';
import { Link } from 'react-router';
import { ImageHelper } from '../../utils';

class Comment extends Component {

  constructor(){
    super();
    this.state = {
      isEditing: false,
      updated: null
    }
  }


  toggleEdited(event){
    event.preventDefault();
    console.log('Edit');
    if (this.state.isEditing) {
      if (this.state.updated != null) {
        this.props.onUpdate(this.props.currentComment, this.state.updated);
      }
    }

    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  componentDidUpdate(){
    console.log(this.state.isEditing);
  }

  updateBody(event) {
    console.log('updatebody:' , event.target.value);
    this.setState({
      updated: event.target.value
    });
  }


  render(){

    const currentComment = this.props.currentComment;
    //console.log("currentComment: " + JSON.stringify(currentComment));
    const author = currentComment.author;
    const radius = 20;
    const editable = (this.props.isEditable) ? this.props.isEditable : false;

    let content = null;

    if (this.state.isEditing == true) {
      content = (
        <div>
          <textarea onChange={this.updateBody.bind(this)} defaultValue={currentComment.body} style={{width: 100 + '%'}}></textarea>
          <br />

          <img style={{borderRadius: radius, marginRight: 6}} src={ImageHelper.thumbnail(author.image, radius*2)} />
          <span style={styles.comment.commentSpan, styles.comment.commentSpanWithMargin }>
            <Link to={`/profile/${author.username}`}>{author.username}</Link>
          </span>
          <span>|</span>
          <span style={styles.comment.commentSpanWithMargin}>{currentComment.timestamp}</span>
          <button onClick={this.toggleEdited.bind(this)}>Done</button>
          <hr />
        </div>
      )
    } else {

        content = (

          <div>
            <div>
              <img src={ImageHelper.commentNail(currentComment.image)} />
            </div>
            <p style={styles.comment.commentP}>
              {currentComment.body}
            </p>

            <img style={{borderRadius: radius, marginRight: 6}} src={ImageHelper.thumbnail(author.image, radius*2)} />
            <span style={styles.comment.commentSpan, styles.comment.commentSpanWithMargin }>
              <Link to={`/profile/${author.username}`}>{author.username}</Link>
            </span>
            <span>|</span>
            <span style={styles.comment.commentSpanWithMargin}>{currentComment.timestamp}</span>
            {
              (editable) ? <button onClick={this.toggleEdited.bind(this)}>Edit</button> : null
            }


            <hr />
        </div>
      )
    }
    return(
      <div>
        { content }
      </div>
    )
  }
}

export default Comment;
