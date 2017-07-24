import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


class CreateComment extends Component {

  constructor(){
    super();
    this.state = {
      comment: {
        body: ''
      }
    }
  }

  updateComment(event){
    let updatedComment = Object.assign({}, this.state.comment);
    updatedComment[event.target.id] = event.target.value;

    this.setState({
      comment: updatedComment
    });


  }

  submitComment(event){
    event.preventDefault();
    this.props.onCreate(this.state.comment)
    this.refs.body.value = '';
  }

  uploadImage(files) {
    this.props.uploadImage(files);
  }

  render(){
    return(
      <div>
        <h3>Create Comment</h3>
        <input ref='body' id='body' onChange={this.updateComment.bind(this)} className='form-control' type='text' placeholder='Comment' /><br />
        <button onClick={this.submitComment.bind(this)} className='btn btn-info'>Submit Comment</button>
        <Dropzone style={{marginLeft: 5 + 'px'}} onDrop={this.uploadImage.bind(this)} className='btn btn-danger'>Upload Image</Dropzone>
    </div>
    )
  }
}

export default CreateComment;
