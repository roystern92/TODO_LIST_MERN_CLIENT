import React, { Component } from 'react';
import classes from './Auth.module.css';

// Redux
import { connect } from 'react-redux';

//Forms
import Auth from '../../components/Forms/Auth/AuthForm';
import * as controls from '../../components/Forms/Controls/auth';

// const login;


class SignIn extends Component {
    render() {
        return (
            <div className={classes.Auth}>
                <Auth controls={controls.signInControls} isSignIn={true} />
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(SignIn);
