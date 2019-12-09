import React, { Component } from 'react';
import classes from './Auth.module.css';

// Redux
import { connect } from 'react-redux';

//Forms
import SignUp from '../../components/Forms/SignUp/SignUp';
// const login;


class Auth extends Component {
    render() {
        return (
            <div className={classes.Auth}>
                <SignUp />
            </div>
        );
    };

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Auth);
