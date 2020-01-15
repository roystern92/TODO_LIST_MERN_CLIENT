import React, {Component} from 'react';
// import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import Routes from './shared/Routes/Routes';


// import Logout from './containers/Auth/Signout';
// import Profile from './components/Views/Profile/Profile';
// import MyDay from './containers/MyDay/MyDay';
// import Home from './components/Views/Home/Home';
// import SignIn from './containers/Auth/Forms/SignIn';
// import SignUp from './containers/Auth/Forms/SignUp';


import {connect} from 'react-redux';
import * as actions from './store/actions/index';


import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        console.log('[App] Render' );

        let routes = <Routes isAuthenticated={this.props.isAuthenticated}/> ;

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
        isAuthenticated: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
