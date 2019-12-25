import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';



class SignOut extends Component {
    componentWillMount() {
        this.props.logout();
    };
    
    render() {
        let logout = <Spinner />;
        
        if (this.props.isAuthenticated) {
            logout = <Redirect to="/" />;
        }

        return (logout);

    };


};

const mapStateToProps = (state) => {
    return (
        {
            isAuthenticated: state.auth.token === null
        }
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SignOut);