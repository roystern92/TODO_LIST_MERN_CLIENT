import React, {Component} from 'react';
import classes from './AddTask.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import axios from 'axios';

class AddTask extends Component {
    state = {
        value: ""
    };

    onChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    addTaskHandler = () => {

        let fetch = axios.create({
            baseURL: 'http://localhost:8080/admin'
        });

        fetch.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();

        let url = '/todo-item/' + this.props.listId;

        let data = new FormData();

        data.append('task', this.state.value);


        fetch.post(url,data)
            .then(res => {
                this.props.onAddTask();
                this.setState({value: ""});
            })
            .catch(err => console.log(err.response));
    };

    createAddTask = () => {
        const addIcon = <FontAwesomeIcon className={classes.Icon} icon={faPlusCircle} size="lg"/>

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