import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';



class SignOut extends Component {
    componentDidMount() {
        this.props.logout();
    }

    render() {
       const logout =  <Redirect to="/" />;
        return logout;
    };


};

const mapStateToProps = (state) => {
    return {
            isAuthenticated: !!state.auth.token
        };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignOut);