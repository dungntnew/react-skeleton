import React, { Component } from 'react';
import Remarkable from 'remarkable';

class Comment extends Component {
  rawMarkup() {
    var md = new Remarkable();
    var raw = md.render(this.props.children.toString());
    return { __html: raw };
  }

  render() {
    return (
      <div className='comment'>
         <h2 className='author'>
            { this.props.author }
         </h2>
         <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
}

export default Comment;
