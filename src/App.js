import React, { Component } from 'react';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Test from './components/test';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import Loader from './components/Loader/Loader';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';



import './App.css';
class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  
  render() {
    let routes = (
      <Switch>
          <Route path="/my-day" component={Test} />
          <Route path="/my-lists" component={Test} />
          <Route path="/profile" component={Test} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
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
  };
  
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
