import React, { Component } from "react";
import "./Account.css"
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      profilepic: ''
    }
  }
  render() {
    return(
      <div className='account-wrapper'>
        <div className='account-paper'>
          <div className='account-profilepic'>
          </div>
          <div className='account-username'>
            <p>Username</p>
          </div>
          <div className='account-password'>
            Password or Button
          </div>
          <div className='account-emailnotfication'>
            Email Notifications Switch
          </div>
          <div className='save-button-wrapper'>
            <button className='save-button'>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Account
