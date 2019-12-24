import React, {Component} from 'react';

import {Route, Switch, withRouter, Redirect} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

import Test from './components/test';
import SignIn from './containers/Auth/SignIn';
import SignUp from './containers/Auth/SignUp';
import Logout from './containers/Auth/Signout';
import Loader from './components/Loader/Loader';
import Profile from './components/Views/Profile/Profile';
import MyDay from './containers/MyDay/MyDay';

import {connect} from 'react-redux';
import * as actions from './store/actions/index';


import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = null;

        if (this.props.isAuthenticated) {
            console.log("test123");

            routes = (
                <Switch>
                    <Route path="/my-day" component={MyDay}/>
                    <Route path="/my-lists" component={Loader}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/test" exact component={MyDay}/>
                    <Route path="/logout" component={Logout}/>
                    <Redirect to="/my-day"/>
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/signIn" component={SignIn}/>
                    <Route path="/signUp" component={SignUp}/>
                    <Route path="/" exact component={Loader}/>
                    <Redirect to="/"/>
                </Switch>
            );
        }


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
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
