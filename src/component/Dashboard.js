import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import "./Dashboard.css";
// import Nav from './Nav'

class Dashboard extends Component {
  componentDidMount() {
    this.getUser();
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

  logout = async () => {
    await axios.post("/auth/logout");
    this.props.clearUser();
  };

  render() {
    // const {id} = this.props
    return (
      <div className="dash-wrapper">
        <div>
        </div>
        <div className="recents-dash">
          <div className="recent-posts" />
          <div className="watchlist" />
          <div className="recent-news" />
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
