import React, { Component } from 'react';
import Select from 'react-select'
import axios from 'axios';
import { connect } from 'react-redux';
import './NewDiscussion.css';
const Checkbox = props => <input type="checkbox" {...props} />;



class NewDiscussion extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      body: '',
      pictures: [],
      topic: '',
      alltopics: [],
      isClearable: true,
      imageToUpload: null
    }
    // set state (title, body, post button, picture)
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  componentDidMount() {
    this.checkForRedirect()
    this.getTopics()
  }

  getTopics = async () => {
    let res = await axios.get('/api/topics');
    this.setState({
      alltopics: res.data
    })
  }

  checkForRedirect =() => {
    console.log(this.props.isLoggedIn)
    if(!this.props.isLoggedIn){
      this.props.history.push('/login?redirect=forum/newdiscussion')
    }
  }

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
      topic: this.state.topic
     }
     try {
      let res = await axios.post('/api/post', post);
     } catch (err) {
       alert('Please fill out the required feilds')
    }
  }

  handleTopic = (value) => {
    this.setState({
      topic: value
    })
  }


  render() {
    const { isClearable, alltopics } = this.state;
    const mappedTopics = this.state.alltopics.map(topic => {
      return {
        value: topic.value,
        label: topic.label
      }
    })
    return(
      <div className='body-wrapper'>
        <div className='new-post-wrapper'>
          <div className='title'>
            <p>Title</p><input className='new-post-title' onChange={e => this.handleChange("title", e.target.value)} />
          </div>
          <div className='content-quil'>
            <p>Content</p><input className='new-post-title' onChange={e => this.handleChange("content", e.target.value)}  />
          </div>
          <div className='content-attachments'>
            <input type="file" size="60"/>
          </div>
          <Select 
          options={mappedTopics}
          className='tag-select'
          isClearable={isClearable}
          onChange={this.handleTopic}
          />
           <div className='finish-buttons'>
           <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
            <p>email notifications</p>
           <button onClick={this.create}>Submit Discussion</button>
           <button>Cancel</button>
           </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = reduxState => {
  return {
    isLoggedIn: reduxState.isLoggedIn
  }
}

export default connect(mapStateToProps)(NewDiscussion)