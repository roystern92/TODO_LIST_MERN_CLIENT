import React, {Component} from 'react';
import * as controls from "../../../shared/Controls/auth";
import Auth from "../../../containers/Auth/AuthForm";


class SignIn extends Component {

    render(){
        return (<Auth controls={controls.signInControls} isSignIn={true} />);
    }

}

export default SignIn;