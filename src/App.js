import React, { Component } from 'react';
import './App.css';
import routes from './routes';
import { withRouter} from 'react-router-dom';
import Nav from './component/Nav'



class App extends Component {
  render() {
    return (
          <div className="App">
            <Nav />
            {routes}
          </div>
    );
  }
}

export default withRouter(App);
