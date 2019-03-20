import React, { Component } from "react";
import "./Account.css"
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import axios from "axios";
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';


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
      toggleLoation: false,
      isUploading: false,
      url: 'http://via.placeholder.com/450x450'
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
            <Dropzone 
              onDropAccepted={this.getSignedRequest}
              style={{
              position: 'relative',
              width: 200,
              height: 200,
              borderWidth: 7,
              marginTop: 100,
              borderColor: 'rgb(102, 102, 102)',
              borderStyle: 'dashed',
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 28,
              }}
              accept='image/*'
              multiple={false} >

              { this.state.isUploading 
                  ?  <GridLoader />
                  : <p>Drop File or Click Here</p>
              }

            </Dropzone>
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
