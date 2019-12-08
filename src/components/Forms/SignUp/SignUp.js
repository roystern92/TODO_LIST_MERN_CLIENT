import React, { Component } from 'react';
import classes from './SignUp.module.css';

import { updateObject, checkValidity } from '../../../shared/utility';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { is } from '@babel/types';


class SignUpForm extends Component {
    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Full Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
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

    createFormOfInputs = (formElementsArray) => {
        let form = null;
        let inputs = formElementsArray.map(formElement => {
            return <Input
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

        if (this.props.loading) {
            inputs = <Spinner />
        }

        form = <form onSubmit={this.submitHandler}>
            {inputs}
            <Button btnType="Success" disabled={!this.state.formIsValid} >SUBMIT</Button>
        </form>;

        return form;
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.controls.name.value);
    };

    render() {
        let formElementsArray = this.createArrayFromObject();
        let form = this.createFormOfInputs(formElementsArray);
        let error = this.props.error ? <p>{this.props.error.message}</p> : null;
        let authRedirect = this.props.isAuthenticated ? <Redirect to='/' /> : null;

        return (
            <div className={classes.SignUp}>
                {authRedirect}
                {error}
                {form}
            </div>
        );
    };
};

const mapStatesToProps = (state) => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, fullName) => dispatch(actions.signUp(email, password, fullName))
    };
};

export default connect(mapStatesToProps, mapDispatchToProps)(SignUpForm);