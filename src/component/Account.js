import React, { Component } from "react";
import "./Account.css";
import { connect } from "react-redux";
import { updateUser, clearUser } from "./../ducks/reducer";
import axios from "axios";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import blue from "@material-ui/core/colors/blue";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  cssRoot: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700]
    },
    borderColor: 'none',

  }
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      email: this.props.email,
      location: this.props.location,
      year: this.props.year || "",
      make: this.props.make || "",
      model: this.props.model || "",
      profile_pic: this.props.profile_pic,
      toggleLoation: false,
      isUploading: false,
      url: "http://via.placeholder.com/450x450"
    };
  }

  componentDidMount() {
    this.getUser();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  getUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/auth/isLoggedIn");
        this.props.updateUser(res.data);
        console.log(res.data);
      } catch (err) {}
    }
  };

  updateUser = async () => {
    let {
      username,
      location,
      email,
      year,
      make,
      model,
      profile_pic
    } = this.state;
    let user = { username, location, email, year, make, model, profile_pic };
    console.log(user);
    try {
      let res = await axios.put("/auth/updateUser", user);
      this.props.updateUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { classes } = this.props;
    // const { id, username, email, profile_pic, location, year, make, model } = this.props;
    return (
      <div className="account-wrapper">
        <div className="account-paper">
          <div>
            <img className="account-profilepic" src={this.props.profile_pic} />
          </div>
          <div className="account-username">
            <TextField
              id="outlined-name"
              label="Username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange("username")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Location"
              className={classes.textField}
              value={this.state.location}
              onChange={this.handleChange("location")}
              margin="normal"
              variant="outlined"
            />
          </div>
          <TextField
            id="outlined-name"
            label="Email"
            className={classes.textField}
            style={{ width: 175 }}
            value={this.state.email}
            onChange={this.handleChange("email")}
            margin="normal"
            variant="outlined"
          />
          <div className="account-password">Password or Button</div>
          <div className="account-year">
            <TextField
              id="outlined-name"
              label="Year"
              className={classes.textField}
              value={this.state.year}
              onChange={this.handleChange("year")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              label="Make"
              className={classes.textField}
              value={this.state.make}
              onChange={this.handleChange("make")}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="outlined-name"
              color="primary"
              label="Model"
              className={classes.textField}
              value={this.state.model}
              onChange={this.handleChange("model")}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="account-emailnotfication">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round" />
            </label>
            <p> Email Notifications </p>
            <div className="save-button-wrapper">
              <Button
                variant="contained"
                color="primary"
                className={classNames(classes.margin, classes.cssRoot)}
                onClick={() => this.updateUser()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

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
)(withStyles(styles)(Account));
