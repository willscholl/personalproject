import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../ducks/reducer";
import "./Auth.css";
import TextField from "@material-ui/core/TextField";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  register = async () => {
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    try {
      let res = await axios.post("/auth/register", user);
      this.props.updateUser(res.data);
      this.props.history.push("/");
      console.log(user);
    } catch (err) {
      alert("error signing up");
      console.log(err);
    }
    this.setState({
      username: "",
      email: "",
      password: ""
    });
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <div className="auth-wrapper">
        <div className="login-body">
          <TextField
            id="Username"
            className="username-register"
            label="Username"
            margin="normal"
            type="username"
            value={username}
            onChange={e => this.handleChange("username", e.target.value)}
          />
          <TextField
            id="Email"
            className="email-register"
            label="Email"
            margin="normal"
            type="email"
            value={email}
            onChange={e => this.handleChange("email", e.target.value)}
          />
          <TextField
            id="password"
            className='password-register'
            label="Password"
            margin="normal"
            type="password"
            value={password}
            onChange={e => this.handleChange("password", e.target.value)}
          />
          <button onClick={this.register}>Register</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    id: reduxState.id,
    usernameOrEmail: reduxState.usernameOrEmail,
    email: reduxState.usernameOrEmail
  };
};
const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
