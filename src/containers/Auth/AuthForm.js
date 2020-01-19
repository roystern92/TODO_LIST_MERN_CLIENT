import React, {Component} from 'react';
import classes from './AuthForm.module.css';
import {createArrayFromObject} from '../../shared/utility';
import {checkValidity} from '../../shared/utility';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions from '../../store/actions';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';


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
        if (this.state.formIsValid !== isFormValid) {
            this.setState({formIsValid: isFormValid});
        }
    };

    onInputChangeHandler = (event, controlName) => {
        let updated = {...this.state.controls};
        let control = updated[controlName];
        control['value'] = event.target.value;
        control['valid'] = checkValidity(event.target.value, this.state.controls[controlName].validation);
        control['touched'] = true;
        updated[controlName] = control;

        this.setState({controls: updated}, this.checkIfFormIsValid);
    };


    createInputs = (formElementsArray) => {
        let inputs = formElementsArray.map(formElement => {
            const {
                id,
                config: {
                    value,
                    elementType,
                    valid,
                    touched,
                    validation,
                    elementConfig
                }
            } = formElement;

            return <Input
                elementType={elementType}
                label={id}
                key={id}
                invalid={!valid}
                touched={touched}
                shouldValidate={validation}
                elementConfig={elementConfig}
                value={value}
                changed={(event) => this.onInputChangeHandler(event, id)}
            />
        });
        return inputs;
    };

    createTitle = () => {
        let title = this.props.isSignIn ? 'Sign In' : 'Sign Up';
        let res =
            <div className={classes.Title}>
                <h2>{title}</h2>
            </div>;
        return res;
    };

    createMemberView = () => {
        let member;

        if (!this.props.isSignIn) {
            member = <div className={classes.Member}>
                <p> Already a member?
                    <Link to='/signIn'>
                        <span> Sign In</span>
                    </Link>
                </p>
            </div>
        } else {
            member = <div className={classes.Member}>
                <p> Not a member?
                    <Link to='/signUp'>
                        <span> Sign Up</span>
                    </Link>
                </p>
            </div>
        }

        return member;
    };

    createTerms = () => {
        let terms = !this.props.isSignIn ?
            <div className={classes.TermsAndPolicy}>
                <p>
                    By clicking the button, I agree to the
                    <span className={classes.Underline}> Term of Services </span>
                    and
                    <span className={classes.Underline}> Privacy Policy</span>.
                </p>
            </div> : null;

        return terms;
    };

    createSubmitButton = () => {
        let submit = this.props.isSignIn ? 'Log In' : 'Sign Up';
        let button =
            <div onClick={(event) => {
                if(this.state.formIsValid){
                    this.submitHandler(event);
                }
            }} className={this.state.formIsValid ? classes.Submit : classes.SubmitDisabled + " " + classes.Submit}>
                <Button disabled={!this.state.formIsValid}>{submit}</Button>
            </div>;

        return button;
    }


    createFormOfInputs = (formElementsArray) => {
        let title = this.createTitle();
        let error = this.createErrors();
        let inputs = this.createInputs(formElementsArray);
        let button = this.createSubmitButton();
        let terms = this.createTerms();
        let member = this.createMemberView();
        let form =
            <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                {title}
                {error}
                {inputs}
                {terms}
                {member}
                {button}
            </form>;

        if (this.props.loading) {
            form = <Spinner/>
        }

        return form;
    };

    submitHandler =  (event) => {
            event.preventDefault();

            if (!this.props.isSignIn ) {
                 this.props.onAuth(this.state.controls.Email.value, this.state.controls.Password.value, this.state.controls.Name.value, true, this.state.controls.Gender.value);
            } else {
                this.props.onAuth(this.state.controls.Email.value, this.state.controls.Password.value, null, false);
            }
    };

    createErrors = () => {
        let errors = this.props.error ? <div className={classes.Errors}>
            <h5>{this.props.error}</h5>
        </div> : null;

        return errors;
    };

    render() {
        let formElementsArray = createArrayFromObject(this.state.controls);
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
        isAuthenticated: !!state.auth.token,
        error: state.auth.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, fullName, signUp, gender) => dispatch(actions.auth(email, password, fullName, signUp, gender)),
        onResetError: () => dispatch(actions.authResetError())
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(AuthForm);