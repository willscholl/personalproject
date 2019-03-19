import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios'
import "./Forum.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    // margin: '60px 50px',
    width: "100%"
  },
  // expansion: {
  //   backgroundImage: 
  //     'url("http://pre03.deviantart.net/7384/th/pre/f/2013/084/9/6/extreme_rx7_with_a_hint_of_stance_by_atc_design-d5z7p1g.jpg")',
  // },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  recentPosts: {
    display: "flex",
  }
});

class Forum extends Component {
  constructor() {
    super();
    this.state = {
      expanded: null,
      post: {}
    };
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className="forum-wrapper">
      <Link to="/forum/newdiscussion">Start New Topic</Link>
        <div className="select-wrapper">
          <div className={classes.root}>
            <ExpansionPanel
              expanded={expanded === "panel1"}
              onChange={this.handleChange("panel1")}
              className={classes.expansion}
            >
              <ExpansionPanelSummary style={{ background: 'white'}} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Car & Automotive" style={{ textDecoration: 'none', color: "black"}}>
                    Car and Automotive
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1' >
                  <div className='profile-pic'></div>
 
                  <Typography className='recent1text' >
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel2"}
              onChange={this.handleChange("panel2")}
            >
              <ExpansionPanelSummary style={{ background: 'white'}} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Drift" style={{ color: "black" }}>
                    Drift
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  You are currently not an owner
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel3"}
              onChange={this.handleChange("panel3") }
            >
              <ExpansionPanelSummary style={{ background: 'white'}} expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Build Logs" style={{ color: "black" }}>
                    Build Logs
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  Filtering has been entirely disabled for whole web server
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
              <div className='mostrecent1'>
                <div className='profile-pic'></div>
                <Typography className='recent1text'>
                  MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </div>
              <div className='mostrecent1'>
                <div className='profile-pic'></div>
                <Typography className='recent1text'>
                  MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </div>
              <div className='mostrecent1'>
                <div className='profile-pic'></div>
                <Typography className='recent1text'>
                  MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </div>
            </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel4"}
              onChange={this.handleChange("panel4")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/American Manufacturers" style={{ color: "black" }}>
                    American Manufacturers
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel5"}
              onChange={this.handleChange("panel5")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Euro Manufacturers" style={{ color: "black" }}>
                    Euro Manufacturers
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel6"}
              onChange={this.handleChange("panel6")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Repairs & Maintenance" style={{ color: "black" }}>
                    Repairs & Maintenance
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
              <div className='mostrecent1'>
                <div className='profile-pic'></div>
                <Typography className='recent1text'>
                  MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </div>
              <div className='mostrecent1'>
                <div className='profile-pic'></div>
                <Typography className='recent1text'>
                  MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </div>
              <div className='mostrecent1'>
                <div className='profile-pic'></div>
                <Typography className='recent1text'>
                  MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </div>
            </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel7"}
              onChange={this.handleChange("panel7")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Aftermarket Parts" style={{ color: "black" }}>
                    Aftermarket Parts
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel8"}
              onChange={this.handleChange("panel8")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Racing" style={{ color: "black" }}>
                    Racing
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel9"}
              onChange={this.handleChange("panel9")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Off Topic" style={{ color: "black" }}>
                    Off Topic
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel10"}
              onChange={this.handleChange("panel10")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Gossip & News" style={{ color: "black" }}>
                    Gossip & News
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel_11"}
              onChange={this.handleChange("panel_11")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/Site Related Discussions" style={{ color: "black" }}>
                    Site Related Discussions
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === "panel_12"}
              onChange={this.handleChange("panel_12")}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>
                  <Link to="/forum/For Sale" style={{ color: "black" }}>
                    For Sale
                  </Link>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='recentposts'>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 1 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 2 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
                <div className='mostrecent1'>
                  <div className='profile-pic'></div>
                  <Typography className='recent1text'>
                    MOST RECENT POST 3 Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                  </Typography>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </div>
    );
  }
}

Forum.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Forum);
