import React, {Component, Fragment} from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import './Task.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faEdit, faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import classes from './Task.module.css';
import axios from '../../../axios/axios-todo-lists';


class Task extends Component {

    state = {
        task: this.props.task,
        important: this.props.task.important,
        completed: this.props.task.completed,
        value: this.props.task.task
    };

    taskCompletedHandler = () => {
        console.log("ffff");
        let completed =!this.state.completed;
        console.log(completed);
            this.setState({completed: completed}, () => {
        });

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
        let url = '/admin/todo-item/' + this.state.task._id;
        let data = new FormData();

        data.append('task', this.state.task.task);
        data.append('note', this.state.task.note);
        data.append('completed', !this.state.task.completed);
        data.append('important', this.state.task.important);


        axios.put(url, data)
            .then(res => {
                this.setState({task: res.data.task});
            })
            .catch(err => console.log(err.response));
    };


    createIcon = () => {
        let icon = null;
        if (this.state.completed) {
            icon = faCheckCircle;
        } else {
            icon = faCircle;
        }

        let res = <FontAwesomeIcon onClick={this.taskCompletedHandler} className={classes.Icon} icon={icon}
                                   size="lg"/>
        return res;

    };


    createTask = () => {
        let element = this.createIcon();
        let content = this.state.completed ?  <h1 className={classes.Completed}>{this.state.task.task}</h1> :
            <h1>{this.state.task.task}</h1>;

        let task =
            <Fragment>

                <div className={classes.Task}>
                    {element}
                    {content}
                    <FontAwesomeIcon className={classes.Pen} icon={faEdit} size="sm"/>
                </div>

                <hr className={classes.Line}/>
            </Fragment>


        return (
            <div className={classes.Container}>
                <ContextMenuTrigger id={this.state.task._id}>
                    {task}
                </ContextMenuTrigger>

                <ContextMenu id={this.state.task._id}>
                    <MenuItem data={{foo: 'bar'}} onClick={() => {
                        this.taskCompletedHandler();
                    }}>
                        {this.state.completed ? "Mark as not completed" : "Mark as completed"}
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        {this.state.important ? "Mark as not important" : "Mark as important"}
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Delete
                    </MenuItem>
                </ContextMenu>

            </div>
        );
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.task._id !== nextProps.task._id ||
            this.state.completed !== nextState.completed ||
            this.state.important !== nextState.important) {
            return true;
        }

        return false;
    }


    render() {
        console.log("[Task] - Render ");

        let task = this.createTask();
        return task;
    }
    ;
};

export default Task;