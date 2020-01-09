import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Auth/Signout';
import Loader from './components/Loader/Loader';
import Profile from './components/Views/Profile/Profile';
import MyDay from './containers/MyDay/MyDay';
import Home from './components/Views/Home/Home';

import {connect} from 'react-redux';
import * as actions from './store/actions/index';


import './App.css';
import * as controls from "./shared/Controls/auth";
import Auth from './containers/Auth/AuthForm';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        console.log('[App] Render' );

        let routes = null;

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/my-day" component={MyDay}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/" exact component={Home}/>
                    <Redirect to="/my-day"/>
                </Switch>
            );
        } else {
            routes = (
                <Switch>
                    <Route path="/signIn">
                        <Auth controls={controls.signInControls} isSignIn={true} />
                    </Route>

                    <Route path="/signUp" >
                        <Auth controls={controls.signUpControls} isSignIn={false} />
                    </Route>

                    <Route path="/" exact component={Home}/>
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
