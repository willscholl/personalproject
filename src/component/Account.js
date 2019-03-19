import React, { Component } from "react";
import "./Account.css"
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import axios from "axios";


class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      location: '',
      year: '',
      make: '',
      model: '',
      profile_pic: '',
      toggleLoation: false
    }
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/auth/isLoggedIn");
        this.props.updateUser(res.data);
        console.log(res.data)

      } catch (err) {}
    }
  };

  render() {
    const { id, username, email, profile_pic, location, year, make, model } = this.props;
    return(
      <div className='account-wrapper'>
        <div className='account-paper'>
          <div >
            <img className='account-profilepic' src={this.props.profile_pic}/>
          </div>
          <div className='account-username'>
            <p>{this.props.username}</p>
          </div>
          <div className='account-password'>
            Password or Button
          </div>
          <div className='account-password'>
            { this.state.toggleLoation ? (
              <input 
               
              />
            ) : (
              <div>
              </div>
            )}
          </div>
          <div className='account-password'>
            {}
          </div>
          <div className='account-password'>
            {}
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

const mapStateToProps = reduxState => {
  return {
    id: reduxState.id,
    username: reduxState.username,
    email: reduxState.email,
    profile_pic: reduxState.profile_pic,
    location: reduxState.location,
    year: reduxState.year,
    make: reduxState.make,
    model: reduxState.model
  };
};
const mapDispatchToProps = {
  updateUser,
  clearUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
