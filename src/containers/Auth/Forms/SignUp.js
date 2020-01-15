import React, {Component} from 'react';
import * as controls from "../../../shared/Controls/auth";
import Auth from "../../../containers/Auth/AuthForm";


class SignUp extends Component {

    render() {
        let res =
            <Auth controls={controls.signUpControls} isSignIn={false}/>;
        return res;
    }

}

export default SignUp;