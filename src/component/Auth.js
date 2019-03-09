import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../ducks/reducer";
import "./Auth.css"

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: ""
    };
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }


  login = async () => {
     let user = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
     }
     try {
      let res = await axios.post('/auth/login', user);
      this.props.updateUser(res.data)
      if(this.props.location.search){
        this.props.history.push('/' + this.props.location.search.split('?redirect=')[1])
      }else {
        this.props.history.push('/')
      }
     } catch (err) {
       alert('Incorrect username or password')
     }
  }

  render() {
    const { usernameOrEmail, password } = this.state;
    return (
        <div className='login-body'>
          <input
            placeholder="Username or Email" 
            value={usernameOrEmail}
            onChange={e => this.handleChange("usernameOrEmail", e.target.value)}
          />
          <input
            placeholder='password'
            type="password"
            value={password}
            onChange={e => this.handleChange("password", e.target.value)}
          />
          <button onClick={this.login}>Login</button>
          <div>
            <Link to='/register'>
              <button>Click here to register!!</button>
            </Link>
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
)(Auth);
