import React, {Component} from 'react';
import classes from './AddTask.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import axios from '../../../axios/axios-todo-lists';

class AddTask extends Component {
    state = {
        value: ""
    };

    onChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    addTaskHandler = () => {

        if (this.props.value === ""){
            return;
        }
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
        let url = '/admin/todo-item/' + this.props.listId;
        let data = new FormData();

        data.append('task', this.state.value);


        axios.post(url,data)
            .then(res => {
                this.props.onAddTask();
                this.setState({value: ""});
            })
            .catch(err => console.log(err.response));
    };

    createAddTask = () => {
        const addIcon = <FontAwesomeIcon onClick={this.addTaskHandler} className={classes.Icon} icon={faPlusCircle} size="lg"/>

        let addTask =
                <div className={classes.Task}>
                    {addIcon}
                    <input type="text" onChange={(event) => {
                        this.onChangeHandler(event)
                    }} value={this.state.value} placeholder="Add task"/>
                    <Button onClick={this.addTaskHandler} className={classes.AddButton} color="Inverse" size='sm' >Add</Button>
                </div>
        return addTask;
    };


    render() {
        console.log("[AddTask] - Render ");

        let addTask = this.createAddTask();
        return addTask;

    };

}

export default AddTask;