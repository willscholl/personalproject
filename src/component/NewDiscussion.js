import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { connect } from "react-redux";
import "./NewDiscussion.css";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
// const Checkbox = props => <input type="checkbox" {...props} />;

const Editor = {}
Editor.modules = {}
Editor.modules.toolbar = [
  ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
  ['blockquote', 'code-block'],                    // blocks
  [{ 'header': 1 }, { 'header': 2 }],              // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
  [{ 'direction': 'rtl' }],                        // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
  [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
  [{ 'font': [] }],                                // font family
  [{ 'align': [] }],                               // text align
  ['clean'],                                       // remove formatting
]

Editor.formats = [
  'header', 'font', 'background', 'color', 'code', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'script', 'align', 'direction',
  'link', 'image', 'code-block', 'formula', 'video'
]

class NewDiscussion extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      pictures: [],
      topic: "",
      alltopics: [],
      isClearable: true,
      imageToUpload: null
    };

    this.quillRef = null;
    this.reactQuillRef = null;
    // set state (title, body, post button, picture)
  }

  componentDidMount() {
    // this.checkForRedirect();
    this.getTopics();
    this.attachQuillRefs()
  }
  
  componentDidUpdate () {
    this.attachQuillRefs()
  }
  
  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleQuillChange = (html) => {
    this.setState({ content: html })
  }

  getTopics = async () => {
    let res = await axios.get("/api/topics");
    this.setState({
      alltopics: res.data
    });
  };

  checkForRedirect = () => {
    console.log(this.props.isLoggedIn);
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login?redirect=forum/newdiscussion");
    }
  };

  // createPost(title, content, topic) {
  //   axios.post('/api/post', { title, content, topic }).then(res => {
  //     this.setState({
  //       title: res.data,
  //       content: res.data,
  //       topic: res.data
  //     });
  //   });
  // }

  create = async () => {
    let post = {
      title: this.state.title,
      content: this.state.content,
      topic_id: this.state.topic.topic_id
    };
    try {
      let res = await axios.post("/api/post", post);
    } catch (err) {
      alert("Please fill out the required feilds");
    }
  };

  handleTopic = value => {
    this.setState({
      topic: value
    });
  };

  render() {
    console.log(this.state.content)
    const { isClearable } = this.state;
    const mappedTopics = this.state.alltopics.map(topic => {
      return {
        topic_id: topic.id,
        label: topic.label
      };
    });
    return (
      <div className="body-wrapper">
        <div className="new-post-wrapper">
          <div className="title">
            <p>Title</p>
            <input
              className="new-post-title"
              onChange={e => this.handleChange("title", e.target.value)}
            />
          </div>
          <div className="content-quill">
            <p>Content</p>
            <ReactQuill 
              ref={(el) => { this.reactQuillRef = el }}
              theme={'snow'}
              onChange={this.handleQuillChange}
              modules={Editor.modules}
              formats={Editor.formats}
              defaultValue={this.state.content}
              value={this.state.content}
              placeholder="Testing Grounds" 
              className='quillbox'
            />
          </div>
          <div className="content-quill">
            <div id="quill-test"></div>
          </div>
          <div className="content-attachments">
            <input type="file" size="60" />
          </div>
          <Select
            options={mappedTopics}
            className="tag-select"
            isClearable={isClearable}
            onChange={this.handleTopic}
          />
          <div className="finish-buttons">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
            <p>email notifications</p>
            <button onClick={this.create}>Submit Discussion</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    isLoggedIn: reduxState.isLoggedIn
  };
};

export default connect(mapStateToProps)(NewDiscussion);
