import React, { Component } from 'react';

import Comment from './Comment';

class CommentList extends Component {
  render() {
    var comments = this.props.data;
    var commentNodes = comments.map((comment) =>
      (
        <Comment author={comment.author} key={comment.id}>
            {comment.text}
        </Comment>
      )
    );

    return (
      <div className='commentList'>
         { commentNodes }
      </div>
    );
  }

}

export default CommentList;
