import React, {Component, Fragment} from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import './Task.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faStar, faCheckCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons';
import classes from './Task.module.css';
import axios from '../../../axios/axios-todo-lists';
import * as actions from "../../../store/actions";
import {connect} from 'react-redux';


class Task extends Component {

    state = {
        task: this.props.task,
        important: this.props.task.important,
        completed: this.props.task.completed,
        changing: false
    };

    updateCurrentTaskWithDummyTask = (important, completed) => {
        let currentTask = {...this.state.task};
        currentTask.important = important;
        currentTask.completed = completed;
        this.props.onSetTask(currentTask);
    }

    taskStatusChangeHandler =  (event, isImportant, isCompleted) => {
            event.stopPropagation();

            if(!this.state.changing){
                console.log("1");
                this.setState({changing: true}, async () => {
                    try {
                        let url = '/admin/todo-item/' + this.state.task._id;
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();

                        let data = new FormData();
                        let important = isImportant ? !this.state.important : this.state.important;
                        let completed = isCompleted ? !this.state.completed : this.state.completed;
                        this.updateCurrentTaskWithDummyTask(important, completed);

                        this.setState({completed: completed, important: important});


                        data.append('task', this.state.task.task);
                        data.append('note', this.state.task.note);
                        data.append('completed', completed);
                        data.append('important', important);

                        let res = await axios.put(url, data);
                        this.props.onSetTask(res.data.task);

                        this.setState({task: res.data.task, changing: false});

                    } catch (e) {
                        console.log(e.response);
                    }
                });
            }
    };

    createIcon = () => {
        let icon = null;
        if (this.state.completed) {
            icon = faCheckCircle;
        } else {
            icon = faCircle;
        }

        let res =
            <FontAwesomeIcon
                onClick={(e) => this.taskStatusChangeHandler(e, false, true)}
                className={classes.Icon} icon={icon}
                size="lg"/>

        return res;
    };


    createTask = () => {
        let element = this.createIcon();
        let content = this.state.completed ? <h1 className={classes.Completed}>{this.state.task.task}</h1> :
            <h1>{this.state.task.task}</h1>;

        let icon = this.state.important ? solidStar : faStar;

        let task =
            <Fragment>
                <div className="Content" onClick={(event) => {
                    if(!this.state.changing) {
                        this.props.onTaskClicked(this.props.task);
                    }
                }}>
                    <div className={classes.Task}>
                        {element}
                        {content}



                        <FontAwesomeIcon
                            className={classes.Star}
                            icon={icon} size="sm"
                            onClick={(e) => {
                                this.taskStatusChangeHandler(e, true, false);
                            }}
                        />

                        <FontAwesomeIcon
                            className={classes.Delete}
                            icon={faTrashAlt} size="sm"
                            onClick={ (event) => {
                                event.stopPropagation();
                                this.props.onSetModal(true);
                                this.props.onDeleteTask(this.state.task._id);
                                this.props.onSetTask(null);
                            }}
                        />

                    </div>

                    <hr className={classes.Line}/>
                </div>

            </Fragment>

        return (
            <div className={classes.Container}>

                <ContextMenuTrigger id={this.state.task._id}>
                    {task}
                </ContextMenuTrigger>

                <ContextMenu id={this.state.task._id}>
                    <MenuItem data={{foo: 'bar'}} onClick={(e) => {
                        this.taskStatusChangeHandler(e, false, true);
                    }}>
                        {this.state.completed ? "Mark as not completed" : "Mark as completed"}
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={(e) => {
                        this.taskStatusChangeHandler(e, true, false);
                    }}>
                        {this.state.important ? "Mark as not important" : "Mark as important"}
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem onClick={ () => {
                        this.props.onSetModal(true);
                        this.props.onDeleteTask(this.state.task._id);
                        this.props.onSetTask(null);
                    }}>
                        Delete
                    </MenuItem>
                </ContextMenu>

            </div>
        );
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("[Task] shouldComponentUpdate");

        if (this.state.task._id !== nextProps.task._id ||
            this.state.completed !== nextState.completed ||
            this.props.task.task !== nextProps.task.task ||
            this.state.important !== nextState.important) {
            console.log("[Task] shouldComponentUpdate -  TRUE");

            return true;
        }

        return false;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.task.task !== state.task.task) {
            return {
                task: props.task
            };
        }

        return null;
    }


    render() {
        console.log("[Task] - Render ");

        let task = this.createTask();
        return task;
    };
};

const mapStateToProps = state => {
    return {
        currentList: state.lists.currentList
    };
};


const mapDispatchToProps = dispatch => {

    return {
        onSetTask: (task) => dispatch(actions.setCurrentTask(task)),
        onDeleteTask: (taskId) => dispatch(actions.setDeletedTask(taskId)),
        onTaskClicked: (task) => dispatch(actions.setCurrentTask(task)),
        onSetModal: (showModal) => dispatch(actions.setModal(showModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);