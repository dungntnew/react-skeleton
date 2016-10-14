import React, { Component } from 'react';
import $ from 'jquery';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  constructor(props) {
    console.log('create');
    super(props);
    this.state = {
      data: [],
    };
  }

  loadDataFromServer() {
    console.log('updating..');
    this.req = $.ajax({
      url: this.props.url,
      method: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({'data': data})
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.url, status, err.toString())
      }.bind(this),
    });
  }

  handleCommentSubmit(comment) {
    // todo: submit comment to server and refresh list
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: comment,
      success: function(newComment) {
        this.setState({data: comments.concat([newComment])});
      }.bind(this),
      error: function(xhr, status, err){
        this.setState({data: comments});
        console.log(this.props.url, status, err.toString())
      }.bind(this)
    });
  }

  componentDidMount() {
    console.log('mount');
    this.loadDataFromServer();
    setInterval(this.loadDataFromServer.bind(this), this.props.poolInterval);
  }

  componentWillUnmount() {
    console.log('release');
    this.req.abort();
  }

  render() {
    console.log('render');
    return (
      <div className='commentBox'>
      <p> comments: </p>
      <CommentList data={this.state.data} />
      <hr/>
      <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
      </div>
    );
  }
}

export default CommentBox;
