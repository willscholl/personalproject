import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class Nav extends Component {
  componentDidMount() {
    this.isLoggedIn();
  }
  isLoggedIn = async () => {
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
    const { id } = this.props;
    return (
      <header className="nav-wrapper">
        <div className="Logo-div"><img src='./../assets/Screen Shot 2019-03-25 at 12.48.24 PM (2).png' /></div>
        <div className="nav-buttons">
          <Link to="/">
            <button className="forum-button">HOME</button>
          </Link>
          <Link to="/forum">
            <button className="forum-button">forum</button>
          </Link>
          {id ? (
            <button className="forum-button" onClick={this.logout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="forum-button"> Login </button>
            </Link>
          )}
          <Link to="/account">
            <button className="forum-button">ACCOUNT</button>
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id,
    isLoggedIn: reduxState.isLoggedIn
  };
};
const mapDispatchToProps = {
  updateUser,
  clearUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
