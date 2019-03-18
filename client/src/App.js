import React, { Component } from 'react';
import './App.css';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import LoginPage from './app/pages/LoginPage';
import RegisterPage from './app/pages/RegisterPage';
import ConfigurePage from './app/pages/ConfigurePage';
import MainPage from './app/pages/MainPage';
import Error404 from './app/pages/Error404';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={LoginPage}/>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route exact path="/configure" component={ConfigurePage}/>
              <Route exact path="/main" component={MainPage}/>
              <Route component={Error404}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
