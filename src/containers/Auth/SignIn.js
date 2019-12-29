import React, { Component } from 'react';

//Forms
import Auth from './Forms/Auth/AuthForm';
import * as controls from './Forms/Controls/auth';

// const login;


class SignIn extends Component {
    render() {
        return (
                <Auth controls={controls.signInControls} isSignIn={true} />
        );
    };

};


export default SignIn;
