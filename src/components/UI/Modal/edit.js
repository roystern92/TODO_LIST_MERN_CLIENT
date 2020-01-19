import React, {Component} from 'react';
import {editProfileControl} from '../../../shared/Controls/auth';
import Input from "../../../components/UI/Input/Input";
import {checkValidity, updateObject} from "../../../shared/utility";
import classes from './Modal.module.css';
import {Button} from "reactstrap";
import axios from '../../../axios/axios-todo-lists';

class edit extends Component {

    state = {
        control: null,
        type: null
    };


    onInputChangeHandler = (event) => {
        const updatedControl = updateObject(this.state.control, {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.control.validation)
        });


        this.setState({control: {...updatedControl}});
    };

    confirmChangeHandler = async () => {
        try {
            this.props.onCancel();
            const type = this.state.type.toLowerCase();

            const formData = new FormData();
            formData.append(type, this.state.control.value);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
            await axios.put('/auth/profile', formData);

            this.props.onConfirm();
        }catch (e) {
            console.log(e.response)
        }
    }



    createEdit = () => {
        let res = <div className={classes.EditProfile}>
            <Input
                elementType={this.state.control.elementType}
                label={this.props.type}
                value={this.state.control.value}
                invalid={!this.state.control.valid}
                touched={this.state.control.touched}
                shouldValidate={this.state.control.validation}
                elementConfig={this.state.control.elementConfig}
                changed={(event) => this.onInputChangeHandler(event)}
            />

            <Button color="primary" size="sm" onClick={this.confirmChangeHandler}>
                Confirm</Button>


            <Button color="secondary" size="sm"
                    onClick={() => {
                        this.props.onCancel();
                        this.setState({type: null});
                    }}>Cancel</Button>

        </div>;
        return res;
    };


    render() {
        let edit = this.state.control ? this.createEdit() : null;

        return edit;

    };

    static getDerivedStateFromProps(props, state) {
        if(!props.type){
            return {
                control: null,
                type: null
            };
        } else if (props.type !== state.type && props.type) {
            let control = editProfileControl[props.type];
            control.value = props.type ? props.user[props.type.toLowerCase()] : "";

            return {
                control: control,
                type: props.type
            }
        }

        return null;
    }

};


export default edit;