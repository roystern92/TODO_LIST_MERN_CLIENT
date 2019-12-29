import React, { Component } from 'react';


//Forms
import Auth from './Forms/Auth/AuthForm';
import * as controls from './Forms/Controls/auth';

// const login;


class SignUp extends Component {
    render() {
        return (
                <Auth controls={controls.signUpControls} isSignIn={false} />
        );
    };

};

export default SignUp;

