import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./Topic.css";

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      discussions: []
    };
  }

  componentDidMount() {
    this.getTopic();
  }

  getTopic = async () => {
    const { discussions } = this.state;
    let res = await axios.get(`/api/topic/${this.props.match.params.topic}`);
    // console.log(res.data);
    this.setState({
      discussions: res.data,
      topic: this.props.match.params.topic
    });
  };

  render() {
    const discussionsMapped = this.state.discussions.map(discussion => {
      return (
        <div className="discussions-wrapper" key={discussion.id}>
          <div className='discussion-account-info'>
            ACCOUNT INFO 
          </div>
          <div className='post-info'>
            <Link to={`/forum/Car & Automotive/` + discussion.id}>{discussion.title}</Link>
            <div dangerouslySetInnerHTML={{ __html: discussion.content}}></div>
          </div>
        </div>
      );
    });
    // console.log(this.props);
    return <div>{discussionsMapped}</div>;
  }
}

export default Topic;
