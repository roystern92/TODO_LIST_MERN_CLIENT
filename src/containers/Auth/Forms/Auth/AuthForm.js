import React, {Component} from 'react';
import classes from './AuthForm.module.css';

import {updateObject, checkValidity} from '../../../../shared/utility';
import {Redirect, Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';

import Spinner from '../../../../components/UI/Spinner/Spinner';
import Button from '../../../../components/UI/Button/Button';
import Input from '../../../../components/UI/Input/Input';


class AuthForm extends Component {
    state = {
        controls: this.props.controls,
        formIsValid: false
    };

    componentDidMount() {
        this.props.onResetError();
    };

    checkIfFormIsValid = () => {
        let isFormValid = true;
        for (let key in this.state.controls) {
            if (!this.state.controls[key].valid) {
                isFormValid = false;
            }
        }
        // console.log("password: " + this.state.controls.password.valid);

        if (this.state.formIsValid !== isFormValid) {

            this.setState({formIsValid: isFormValid});

        }


        // return isFormValid;
    };

    onInputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
            })
        });

        // let formIsValid = this.checkIfFormIsValid();

        this.setState({controls: updatedControls}, this.checkIfFormIsValid);
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

    createTitle = () => {
        let res = null;

        if (this.props.isSignIn) {
            res = <div className={classes.Title}>
                <h2><Link to='/signUp '>
                    <span className={classes.SignIn}>Sign Up</span>
                </Link>
                    <span className={classes.Or}> or</span> Sign In </h2>
            </div>;
        } else {
            res = <div className={classes.Title}>
                <h2>
                    <Link to='/signIn '>
                        <span className={classes.SignIn}>Sign In</span>
                    </Link>
                    <span className={classes.Or}> or</span> Sign Up
                </h2>
            </div>;
        }

        return res;
    };

    createMemberView = () => {
        let member = null;

        if (!this.props.isSignIn) {
            member = <div className={classes.Member}>
                <p> Already a member?
                    <Link to='/signIn'>
                        <span>Sign In</span>
                    </Link>
                </p>
            </div>
        } else {
            member = <div className={classes.Member}>
                <p> Not a member?
                    <Link to='/signUp'>
                        <span>Sign Up</span>
                    </Link>
                </p>
            </div>
        }

        return member;
    };

    createFormOfInputs = (formElementsArray) => {
        let inputs = this.createInputs(formElementsArray);
        let submit = this.props.isSignIn ? 'Sign In' : 'Sign Up';
        let title = this.createTitle();
        let terms = !this.props.isSignIn ?
            <div className={classes.TermsAndPolicy}>
                <p>
                    By clicking the button, I agree to the
                    <span className={classes.Underline}> Term of Services </span>
                    and
                    <span className={classes.Underline}> Privacy Policy</span>.
                </p>
            </div> : null;

        let member = this.createMemberView();
        let button =
            <div
                onClick={(event) => {
                    if (this.state.formIsValid) {
                        this.submitHandler(event);
                    }
                }}
                className={this.state.formIsValid ? classes.Submit : classes.SubmitDisabled + " " + classes.Submit }>
                <Button disabled={!this.state.formIsValid}>{submit}</Button>
            </div>;

        let error = this.createErrors();


        let form = <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            {title}
            {error}
            {inputs}
            {button}
            {terms}
            {member}
        </form>;

        if (this.props.loading) {
            form = <Spinner/>
        }

        if (this.props.loading) {
            form = <Spinner/>
        }


        return form;
    };

    submitHandler = async (event) => {
        try {
            event.preventDefault();
            let signUp = this.props.isSignIn === false;

            if (signUp) {
               await this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.name.value, true);
            } else {
                this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, null, false);
            }
        }catch (e) {

        }

    };

    createErrors = () => {
        let errors = this.props.error ? <div className={classes.Errors}>
            <h5>{this.props.error}</h5>
        </div> : null;

        return errors;
    };

    render() {

        let formElementsArray = this.createArrayFromObject();
        let form = this.createFormOfInputs(formElementsArray);
        let authForm =
            <div className={classes.Auth}>
                {form}
            </div>;

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
        onAuth: (email, password, fullName, signUp) => dispatch(actions.auth(email, password, fullName, signUp)),
        onResetError: () => dispatch(actions.authResetError())
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(AuthForm);