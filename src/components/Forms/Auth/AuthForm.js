import React, { Component } from 'react';
import classes from './AuthForm.module.css';

import { updateObject, checkValidity } from '../../../shared/utility';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import axios from 'axios';
import Loader from '../../Loader/Loader';

class AuthForm extends Component {
    state = {
        controls: this.props.controls,
        formIsValid: false
    };

    checkIfFormIsValid = () => {
        let isFormValid = true;
        for (let key in this.state.controls) {
            if (!this.state.controls[key].valid) {
                isFormValid = false;
            }
        }

        return isFormValid;
    };

    onInputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
            })
        });

        let formIsValid = this.checkIfFormIsValid();

        this.setState({ controls: updatedControls, formIsValid: formIsValid });
    };

    createArrayFromObject = () => {
        let formElementsArray = [];

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            }
            );
        }

        return formElementsArray;
    };

    createInputs = (formElementsArray) => {
        let inputs = formElementsArray.map(formElement => {
            return <Input
                label={formElement.id}
                key={formElement.id}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.onInputChangeHandler(event, formElement.id)}
            />
        });
        return inputs;
    };

    createFormOfInputs = (formElementsArray) => {
        let form = null;
        let inputs = this.createInputs(formElementsArray);


        let submit = this.props.isSignIn ? 'Sign In' : 'Sign Up';

        let title = this.props.isSignIn ?
            <div className={classes.Title}> <h2> <span className={classes.SignIn}>Sign Up</span>  <span className={classes.Or}>or</span> Sign In </h2>  </div> :
            <div className={classes.Title}> <h2> <span className={classes.SignIn}>Sign In</span>  <span className={classes.Or}>or</span> Sign Up </h2> </div>;

        let terms = !this.props.isSignIn ?
            <div className={classes.TermsAndPolicy}>
                <p>
                    By clicking the button, I agree to the
                 <span className={classes.Underline}>Term of Services</span>
                    and
                  <span className={classes.Underline}>Privacy Policy</span>.
                  </p>
            </div> : null;

        let member = this.props.isSignIn ? <div className={classes.Member}> <p> Already a member? <span>Sign In</span></p>  </div> :
            <div className={classes.Member}> <p> Not a member? <span>Sign Up</span></p> </div>;

        let button = <div className={classes.Submit}>
            <Button disabled={!this.state.formIsValid} >{submit}</Button>
        </div>;

        form = <form onSubmit={this.submitHandler}>
            {title}
            {inputs}
            {button}
            {terms}
            {member}
        </form>;

        if (this.props.loading) {
            form = <Spinner />
        }
        return form;
    };

    submitHandler = (event) => {
        event.preventDefault();
        let signUp = this.props.isSignIn === false;

        if (signUp) {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.name.value, true);
        } else {
            this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, null, false);
            // Todo
        }
    };

    createMyDayList = () => {
        const formData = new FormData();
        formData.append('name', "My Day");
        formData.append('isPublic', false);
        formData.append('isRemovable', false);

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();

        axios.post('http://localhost:8080/admin/list', formData)
            .then(res => {
                console.log("New list was created.");
            })
            .catch(err => {
                console.log("Error while tring to create new list.");
            });;

    };

    render() {

        let formElementsArray = this.createArrayFromObject();
        let form = this.createFormOfInputs(formElementsArray);
        let error = this.props.error ? <p>{this.props.error.message}</p> : null;
        let authRedirect = null;


        let authForm = <div
            className={classes.SignUp}>
            {authRedirect}
            {error}
            {form}
        </div>;



        if (this.props.isAuthenticated && !this.props.isSignIn) {
            authForm = <Redirect to='/' />;
            this.createMyDayList()
        }
        else if (this.props.isAuthenticated) {
            authForm = <Redirect to='/' />;
        } else {
            authRedirect = null;
            authForm = <div
                className={classes.SignUp}>
                {authRedirect}
                {error}
                {form}
            </div>;
        };
        
        return (
            authForm
        )
    };
};

const mapStatesToProps = (state) => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, fullName, signUp) => dispatch(actions.signUp(email, password, fullName, signUp))
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(AuthForm);