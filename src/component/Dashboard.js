import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import "./Dashboard.css";
// import Nav from './Nav'

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      newsarticles: [],
      top5: []
    };
  }
  componentDidMount() {
    this.getUser();
    this.getNews();
    this.getTop5();
  }
  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/auth/isLoggedIn");
        this.props.updateUser(res.data);
      } catch (err) {}
    }
  };

  getTop5 = async () => {
    let res = await axios.get('/api/top5')
    this.setState({
      top5: res.data
    })
    console.log(res.data)
  };

  getNews = async () => {
    let res = await axios.get(
      "https://newsapi.org/v2/everything?q=car&apiKey=5d1629ab957d4633b942ca4b712fea94"
    );
    this.setState({
      newsarticles: res.data.articles
    });
  };

  logout = async () => {
    await axios.post("/auth/logout");
    this.props.clearUser();
  };

  render() {
    const articlesMapped = this.state.newsarticles.map((article, i) => {
      // console.log(this.state.newsarticles);
      return (
        <div key={i} className="news-wrapper">
          <div>
            <h1>{article.title}</h1>
            <div className="article-image">
              <img src={article.urlToImage} alt="img" />
            </div>
            <p>{article.description}</p>
            <a href={article.url}>Read More.</a>
          </div>
        </div>
      );
    });
    // console.log(this.getNews)
    // console.log(this.getTop5)
    const top5mapped = this.state.top5.map((post, i) => {
      return (
        <div key={i} className='top5-wrapper'>
          <div className='top5-user'>
            <img style={{width: '50px'}} src={post.post.profile_pic} alt=''/>
          </div>
          <div>
            <p>{post.post.title}</p>
          </div>
        </div>
      )
    })
    return (
      <div className="dash-wrapper">
        <div style={{display: 'flex'}}>
          <div style={{
              // overflowY: "scroll",
              height: "500px",
              width: "400px",
              margin: "100px auto",
              border: "1px solid black",
              background: 'lightgrey'
            }}>
            {top5mapped}
          </div>
          <div
            style={{
              overflowY: "scroll",
              height: "500px",
              width: "400px",
              margin: "100px auto",
              border: "1px solid black",
              background: 'lightgrey'
            }}
          >
            {articlesMapped}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id,
    username: reduxState.username
  };
};
const mapDispatchToProps = {
  updateUser,
  clearUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
