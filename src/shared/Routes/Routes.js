import {Route, Switch, Redirect,withRouter} from 'react-router-dom';
import Logout from '../../containers/Auth/Signout';
import SignIn from '../../containers/Auth/Forms/SignIn';
import MyDay from '../../containers/MyDay/MyDay';
import SignUp from '../../containers/Auth/Forms/SignUp';
import Profile from '../../components/Views/Profile/Profile';
import Home from '../../components/Views/Home/Home';
import React from "react";


const HOME_ROUTE = '/';
const MY_DAY_ROUTE = '/my-day';
const PROFILE_ROUTE = '/profile';
const SIGN_UP_ROUTE = '/signUp';
const SIGN_IN_ROUTE = '/signIn';
const LOG_OUT_ROUTE = '/logout';




const routes = (props) => {
    let routes = (
        <Switch>
            <Route path={SIGN_IN_ROUTE} exact component={SignIn}/>
            <Route path={SIGN_UP_ROUTE} exact component={SignUp}/>
            <Route path={HOME_ROUTE} exact component={Home}/>
            <Redirect to={HOME_ROUTE}/>
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path={MY_DAY_ROUTE} component={MyDay}/>
                <Route path={PROFILE_ROUTE} component={Profile}/>
                <Route path={LOG_OUT_ROUTE} component={Logout}/>
                <Route path={HOME_ROUTE} exact component={Home}/>
                <Redirect to={MY_DAY_ROUTE}/>
            </Switch>
        );
    }

    return routes;
};


export default routes;