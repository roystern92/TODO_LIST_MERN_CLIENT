import React, { Component } from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Test from './components/test';
import Auth from './containers/Auth/Auth';

import './App.css';
class App extends Component {

  
  render() {
    let routes = (
      <Switch>
          <Route path="/my-day" component={Test} />
          <Route path="/my-lists" component={Test} />
          <Route path="/profile" component={Test} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={Test} />
          <Redirect to="/" />
        </Switch>
    );

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
}

export default App;
