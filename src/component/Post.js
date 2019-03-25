import React, { Component } from "react";
import axios from "axios";
import "./Post.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { connect } from "react-redux";
// import { Route } from 'react-router-dom';

const Editor = {};
Editor.modules = {};
Editor.modules.toolbar = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"], // blocks
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }], // lists
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // header dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults
  [{ font: [] }], // font family
  [{ align: [] }], // text align
  ["clean"] // remove formatting
];

Editor.formats = [
  "header",
  "font",
  "background",
  "color",
  "code",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "script",
  "align",
  "direction",
  "link",
  "image",
  "code-block",
  "formula",
  "video"
];

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      reply: "",
      showQuill: false,
      quillValue: '',
      showSecondQuill: false, 
      secondQuillValue: ''
    };

    this.quillRef = null;
    this.reactQuillRef = null;
  }

  componentDidMount() {
    this.getPost();
    this.attachQuillRefs();
    this.getUser();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  toggleQuill = (i) => {
    let post = this.state.post
    post.replies[i].showQuill = !post.replies[i].showQuill
    this.setState({post})
  }

  toggleSecondQuill = () => {
    this.setState({showSecondQuill: !this.state.showSecondQuill})
  }

  handlePostQuillChange = (html) => {
    this.setState({secondQuillValue: html})
  }

  handleReplyQuillChange = (html, i) => {
    let post = this.state.post
    post.replies[i].quillValue = html
    // console.log(post.replies[i].quillValue)
    this.setState({post})
  }

  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/auth/isLoggedIn");
        // console.log(res.data)
        this.props.updateUser(res.data);
      } catch (err) {}
    }
  };

  attachQuillRefs() {
    if (this.reactQuillRef) {
      if (typeof this.reactQuillRef.getEditor !== "function") return;
      if (this.quillRef != null) return;
      const quillRef = this.reactQuillRef.getEditor();
      if (quillRef != null) this.quillRef = quillRef;
    }
  }

  handleQuillChange = html => {
    this.setState({ reply: html });
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }


  getPost = async () => {
    // console.log(this.props.match.params);
    const { post } = this.state;
    let res = await axios.get(`/api/forum/${this.props.match.params.id}`);
    // console.log(res.data);
    if (res.data.replies) {
      for (let i = 0; i < res.data.replies.length; i++) {
        res.data.replies[i].showQuill = false;
        res.data.replies[i].quillValue = res.data.replies[i].reply
      }
    }
    this.setState({ post: res.data, secondQuillValue: res.data.content });
    console.log(res.data);
  };

  createReply = async () => { 
    let reply = {
      reply: this.state.reply,
      post_id: this.state.post.id
    };
    console.log(reply)
    try {
      await axios.post("/api/reply", reply);
      this.getPost()
      this.setState({showQuill: false, reply: ''})
    } catch (err) {
      // alert("Please fill out the required fields");
    }
  };

  saveReply = async (i) => {
    let updatedReply = {
      reply: this.state.post.replies[i].quillValue,
      reply_id: this.state.post.replies[i].reply_id
    }
    try {
      await axios.put("/api/reply", updatedReply)
      this.getPost()
      this.setState({showQuill: false})
    } catch (err) {
      console.log(err)
    }
  };

  updatePost = async () => {
    let updatedPost = {
      content: this.state.secondQuillValue,
      post_id: this.state.post.id
    }
    try {
      await axios.put("/api/post", updatedPost)
      this.getPost()
      this.setState({showSecondQuill: false})
    } catch (err) {
      console.log(err)
    }
  };

  deleteReply = async (i) => {
    let reply_id = this.state.post.replies[i].reply_id
    try {
      await axios.delete(`/api/reply/${reply_id}`)
      this.getPost()
      this.setState({showSecondQuill: false})
    } catch (err) {
      console.log(err)
    }
  };

  deletePost = async () => {
    let { id } = this.state.post
    try {
      await axios.delete(`/api/post/${id}`)
      this.props.history.push('/forum')
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    console.log(this.state)
    let repliesMapped;
    if (this.state.post.replies) {
      // const { id } = this.props
      repliesMapped = this.state.post.replies.map((reply, i) => {
        return (
          <div className="first-reply" key={i}>
            <div className="author-info">
              <p>{reply.user_id}</p>
              <div>
                <img className='author-pic' src={reply.profile_pic} width="70px" alt="profilepicture" />
              </div>
            </div>
            <div className="reply-content-wrapper">
              <div className="reply-upper-info">
                <p >{reply.date}</p>
                <div className='edit-delete-butts'> 
                {reply.showQuill ?  <React.Fragment><button onClick={()=>this.saveReply(i)}>Save</button><button onClick={() =>this.deleteReply(i)}>Delete</button></React.Fragment>: <React.Fragment> {reply.user_id === this.props.id ? <button onClick={() => this.toggleQuill(i)}>Edit</button> : null } </React.Fragment> } </div>
              </div>
              <div>
                { reply.showQuill 
                ?
                  <ReactQuill
                    ref={el => {
                      this.reactQuillRef = el;
                    }}
                    theme={"snow"}
                    onChange={(html) => this.handleReplyQuillChange(html, i)}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    defaultValue={reply.quillValue}
                    value={reply.quillValue}
                    placeholder="Write your reply here..."
                    className="quillbox-reply"
                  />
                :
                  <div
                    dangerouslySetInnerHTML={{ __html: reply.reply }}
                    className="post-content"
                  />
                }
              </div>
            </div>
          </div>
        );
      });
    } 
    return (
      <div className="post-wrapper">
        <div className="content-wrapper">
          <h1 className="post-title">{this.state.post.title}</h1>
          <div className="first-post">
            <div className="author-info">
             <p>{this.state.post.user_id}</p>
              <div>
                <img className="author-pic" src={this.state.post.profile_pic} alt="profilepicture" />
              </div>
            </div>
            <div className="post-content-wrapper">
              <div className="post-upper-info">
                <p>{this.state.post.date}</p>
                <div className='edit-delete-butts'>
                  {this.state.showSecondQuill ?  <React.Fragment><button onClick={() => this.updatePost()}>Save</button><button onClick={() => this.deletePost()}>Delete</button></React.Fragment>: <React.Fragment> {this.state.post.user_id === this.props.id ? <button onClick={() => this.toggleSecondQuill()}>Edit</button> : null } </React.Fragment> }
                </div>
              </div>
              <div>
                { this.state.showSecondQuill 
                ?
                  <ReactQuill
                    ref={el => {
                      this.reactQuillRef = el;
                    }}
                    theme={"snow"}
                    onChange={(html) => this.handlePostQuillChange(html)}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    defaultValue={this.state.secondQuillValue}
                    value={this.state.secondQuillValue}
                    placeholder="Write your post here..."
                    className="quillbox-reply"
                  />
                :
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.post.content }}
                    className="post-content"
                  />
                }
              </div>
              <div>
                <img style={{ width: '300px'}} src={this.state.post.photo} alt=''/>
              </div>
            </div>
          </div>
          {repliesMapped}
          <div className="create-reply-wrapper">
            <img className="user-img" src={this.props.profile_pic} alt=''/>
            <div className="reply-input">
              <div className="reply-input-wrapper">
                {this.state.showQuill ? (
                  <div className="reply-quill">
                    <ReactQuill
                      ref={el => {
                        this.reactQuillRef = el;
                      }}
                      theme={"snow"}
                      onChange={this.handleQuillChange}
                      modules={Editor.modules}
                      formats={Editor.formats}
                      defaultValue={this.state.reply}
                      value={this.state.reply}
                      placeholder="Write your reply here..."
                      className="quillbox-reply"
                    />
                    <button style={{ marginBottom: '10px'}} onClick={this.createReply}>Submit</button>
                  </div>
                ) : (
                  <div
                    className="reply-quill"
                    onClick={() =>
                      this.setState({ showQuill: true })
                    } /*ON CLICK TO OPEN A QUILL*/
                  >
                    <p>Reply to this topic...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id,
    profile_pic: reduxState.profile_pic
  };
};

export default connect(
  mapStateToProps
)(Post);
