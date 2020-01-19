import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';


import Layout from './hoc/Layout/Layout';
import Routes from './shared/Routes/Routes';

import {connect} from 'react-redux';
import * as actions from './store/actions/index';


import './App.css';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
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
