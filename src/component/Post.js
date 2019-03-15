import React, { Component } from "react";
import axios from "axios";
import "./Post.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
      showQuill: false,
      content: ""
    };

    this.quillRef = null;
    this.reactQuillRef = null;
  }

  componentDidMount() {
    this.getPost();
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs() {
    if (this.reactQuillRef) {
      if (typeof this.reactQuillRef.getEditor !== "function") return;
      if (this.quillRef != null) return;
      const quillRef = this.reactQuillRef.getEditor();
      if (quillRef != null) this.quillRef = quillRef;
    }
  }

  handleQuillChange = html => {
    this.setState({ content: html });
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  getPost = async () => {
    // console.log(this.props.match.params);
    // const { post } = this.state;
    let res = await axios.get(`/api/forum/${this.props.match.params.id}`);
    console.log(res.data);
    if (res.data.replies) {
      for (let i = 0; i < res.data.replies.length; i++) {
        res.data.replies[i].showQuill = false;
      }
    }
    this.setState({ post: res.data });
    // console.log({ post });
  };

  render() {
    console.log(this.state.post);
    let repliesMapped;
    if (this.state.post.replies) {
      const { replies } = this.state.post;
      console.log(replies);
      repliesMapped = this.state.post.replies.map(reply => {
        return (
          <div className="first-reply" key={reply.id}>
            <div className="author-info">
              <a>{reply.user_id}</a>
              <div className="author-pic">
                <image src={reply.profile_pic} alt="profilepicture" />
              </div>
            </div>
            <div className="reply-content-wrapper">
              <div className="post-upper-info">
                <a>{reply.date}</a>
                <button>Edit</button>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: reply.reply }}
                className="post-content"
              />
            </div>
          </div>
        );
      });
    }

    return (
      <div className="post-wrapper">
        <div className="content-wrapper">
          <p className="post-title">{this.state.post.title}</p>
          <div className="first-post">
            <div className="author-info">
              <a>{this.state.post.user_id}</a>
              <div className="author-pic">
                <image src={this.state.post.profile_pic} alt="profilepicture" />
              </div>
            </div>
            <div className="post-content-wrapper">
              <div className="post-upper-info">
                <a>{this.state.post.date}</a>
                <button>Edit</button>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: this.state.post.content }}
                className="post-content"
              />
            </div>
          </div>
          {repliesMapped}
          <div className="create-reply-wrapper">
            <div className="user-img" />
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
                      defaultValue={this.state.content}
                      value={this.state.content}
                      placeholder="Testing Grounds"
                      className="quillbox-reply"
                    />
                    <button style={{}}>Submit</button>
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

export default Post;
