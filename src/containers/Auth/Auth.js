import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';

//Forms
import SignUp from '../../components/Forms/SignUp/SignUp';
// const login;


class Auth extends Component {
    render() {
        return (
            <SignUp />
        );
    };

};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Auth);
