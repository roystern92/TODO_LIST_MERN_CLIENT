import React, {Component, Fragment} from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import './Task.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faEdit, faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import classes from './Task.module.css';
import axios from '../../../axios/axios-todo-lists';
import * as actions from "../../../store/actions";
import {connect} from 'react-redux';

class Task extends Component {

    state = {
        task: this.props.task,
        important: this.props.task.important,
        completed: this.props.task.completed,
        value: this.props.task.task
    };

    taskStatusChangeHandler = async (isImportant, isCompleted) => {
        try {
            let url = '/admin/todo-item/' + this.state.task._id;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
            let data = new FormData();
            let important = isImportant ? !this.state.important : this.state.important;
            let completed = isCompleted ? !this.state.completed : this.state.completed;
            this.setState({completed: completed, important: important});

            data.append('task', this.state.task.task);
            data.append('note', this.state.task.note);
            data.append('completed', completed);
            data.append('important', important);

            let res = await axios.put(url, data);
            this.setState({task: res.data.task});

        }catch (e) {
            console.log(e.response);
        }
    };

    // deleteTaskHandler = async () => {
    //     try {
    //         let url = '/admin/todo-item/' + this.state.task._id;
    //         this.props.deleteTask(this.state.task._id);
    //         axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
    //         await axios.delete(url);
    //     }catch (e) {
    //         console.log(e.response);
    //     }
    // };


    createIcon = () => {
        let icon = null;
        if (this.state.completed) {
            icon = faCheckCircle;
        } else {
            icon = faCircle;
        }

        let res =
            <FontAwesomeIcon
                onClick={() => this.taskStatusChangeHandler(false, true)}
                className={classes.Icon} icon={icon}
                size="lg"/>

        return res;
    };


    createTask = () => {
        let element = this.createIcon();
        let content = this.state.completed ? <h1 className={classes.Completed}>{this.state.task.task}</h1> :
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
                        this.taskStatusChangeHandler(false, true);
                    }}>
                        {this.state.completed ? "Mark as not completed" : "Mark as completed"}
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={() => {
                        this.taskStatusChangeHandler(true, false);
                    }}>
                        {this.state.important ? "Mark as not important" : "Mark as important"}
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem  onClick={() => this.props.onDeleteTask(this.props.currentList, this.props.task._id)}>
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
        // console.log("[Task] - Render ");

        let task = this.createTask();
        return task;
    };
};

const mapStateToProps = state => {
    return {
        currentList : state.auth.currentList
    };
};


const mapDispatchToProps = dispatch => {

    return {
        onDeleteTask : (list, task) => dispatch(actions.onDeleteTask(list, task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);