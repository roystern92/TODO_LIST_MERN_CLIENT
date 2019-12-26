import React, {Component} from 'react';
import classes from './AddTask.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import axios from '../../../axios/axios-todo-lists';


const avi = () => {
    console.log("ddddd");
}

class AddTask extends Component {
    state = {
        value: ""
    };

    onChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    saveTaskAtServer = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
        let url = '/admin/todo-item/' + this.props.list._id;
        let data = new FormData();

        data.append('task', this.state.value);
        this.setState({value: ""});

        return axios.post(url,data);
    };

    addTaskHandler = () => {
        if (this.props.value !== ""){
            let task = {task: this.state.value, _id: Date.now().toString()};
            this.props.onAddTask(task, this.saveTaskAtServer);
        }
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

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.list !== nextProps.list || this.state.value !== nextState.value){
            return true;
        }
        return false;
    }


    render() {
        console.log("[AddTask] - Render ");

        let addTask = this.createAddTask();
        return addTask;

    };

}

export default AddTask;