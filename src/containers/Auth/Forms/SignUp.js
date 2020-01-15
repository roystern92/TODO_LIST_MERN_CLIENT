import React, {Component} from 'react';
import * as controls from "../../../shared/Controls/auth";
import Auth from "../../../containers/Auth/AuthForm";


class SignUp extends Component {

    render() {
        let res = <div>
            <Auth controls={controls.signUpControls} isSignIn={false}/>
        </div>;
        return res;
    }

}

export default SignUp;