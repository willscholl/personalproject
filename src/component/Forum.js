import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios'
import './Forum.css'

class Forum extends Component {
  // constructor() {
  //   super()

  // }

  render() {
    return(
      <div className="forum-wrapper">
        <Link to='/forum/newdiscussion'>
          <button >Start New Topic</button>
        </Link>

        
      </div>
    )
  }
}

export default Forum