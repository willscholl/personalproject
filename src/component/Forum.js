import React, { Component } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios'
import "./Forum.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    margin: '60px 50px',
    width: '90%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class Forum extends Component {
  constructor() {
    super()
    this.state = {
      expanded: null
    }
  }

  handleChange = panel => (event, expanded) => {
      this.setState({
        expanded: expanded ? panel : false,
      });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className='forum-wrapper'>
        <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>General settings</Typography>
              <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                maximus est, id dignissim quam.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Users</Typography>
              <Typography className={classes.secondaryHeading}>
                You are currently not an owner
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                diam eros in elit. Pellentesque convallis laoreet laoreet.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Advanced settings</Typography>
              <Typography className={classes.secondaryHeading}>
                Filtering has been entirely disabled for whole web server
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                eros, vitae egestas augue. Duis vel est augue.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Personal data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                eros, vitae egestas augue. Duis vel est augue.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <Link to="/forum/newdiscussion">Start New Topic</Link>

        <div className="forum-topic">
          <div className="topic1">
            <Link to="/forum/Car & Automotive">
              <p className="topic-text">Car and Automotive</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Drift">
              <p>Drift</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Build Logs">
              <p>Build Logs</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/American Manufacturers">
              <p>American Manufacturers</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Euro Manufacturers">
              <p>Euro Manufacturers</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Repairs & Maintenance">
              <p>Repairs & Maintenance</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Aftermarket Parts">
              <p>Aftermarket Parts</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Racing">
              <p>Racing</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Off Topic">
              <p>Off Topic</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Gossip & News">
              <p>Gossip & News</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/Site Related Discussions">
              <p>Site Related Discussions</p>
            </Link>
          </div>
          <div className="topic2"></div>
          <div className="topic1">
            <Link to="/forum/For Sale">
              <p>For Sale</p>
            </Link>
          </div>
          <div className="topic2"></div>
        </div>
      </div>
    );
  }
}

Forum.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Forum);
