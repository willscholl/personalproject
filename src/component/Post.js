import React, { Component } from "react";
import axios from "axios";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    this.getPost();
  }

  getPost = async () => {
    // console.log(this.props.match.params);
    const { post } = this.state;
    let res = await axios.get(`/api/forum/${this.props.match.params.id}`);
    this.setState({ post: res.data });
    // console.log({ post });
  };

  render() {
    let repliesMapped
    if(this.state.post.replies){
      const { replies } = this.state.post 
      console.log(replies)
      repliesMapped = this.state.post.replies.map(reply => {
        return (
          <div className='first-reply' key={reply.id}>
            <div>
              <a>{reply.user_id}</a>
            </div>
            <div className='reply-content'>
              <a>{reply.date}</a>
              <a>{reply.reply}</a>
            </div>
          </div>
        )
      })
    }

    return (
      <div className="post-wrapper">
        <div className="content-wrapper">
          <p className='post-title'>{this.state.post.title}</p>
          <div className="first-post">
            <div className="author-info">
              <div></div>
              <a>{this.state.post.user_id}</a>
            </div>
            <div className="post-content">
              <a>{this.state.post.date}</a>
              <div dangerouslySetInnerHTML={{ __html: this.state.post.content}}></div>
            </div>
          </div>
          {repliesMapped}
        </div>
      </div>
    );
  }
}

export default Post;
